import select from "../../../utils/dom.js";
import { deleteFileOnGist } from "../../../utils/github/api.ts";
import hashBrowser from "../../../utils/hashBrowser.ts";
import isJSON from "../../../utils/isJSON.ts";
import storage from "../../../utils/localstorage.js";
import { resetPageTitle, setPageTitle } from "../../../utils/pageTitle.js";
import { url } from "../../../utils/urlManager.ts";
import notify from "../../molecules/notify.ts";
import commander from "../commander/commander.ts";
import { setSavedState } from "../../../ui/functions/savedState.ts";

const encodeTitle = (title: string) => {
  const encodedTitle = encodeURIComponent(title);
  if (encodedTitle.length === 0) {
    throw new Error("You need to start with a valid title for your note!");
  }
  return encodedTitle;
};

export const getDateCreatedFromTitle = (title: string): number => {
  const titleID = getTitleId(title);
  const note = getNote(titleID);
  if (note) {
    const { dateCreated } = note;
    return dateCreated;
  }
  throw new Error(`Note "${title}" cannot found!`);
};

export const markNoteForDeletion = (id: string) => {
  const note = getNote(id);
  if (note) {
    localStorage.setItem(
      id,
      JSON.stringify({
        title: note.title,
        deleted: true,
        revisions: note.revisions,
      }),
    );
  }
};

export type Note = {
  id: string;
  title: string;
  text: string;
  dateCreated: number;
  deleted: boolean;
  lines: Array<string>;
  numberOfRevisions: number;
  disableSync: boolean;
  revisions: {
    [key: string]: {
      text: string;
      dateCreated: number;
    };
  };
};

export const getNote = (
  titleID = url.getPageId(),
  revision?: string,
): Note | null => {
  let doc;
  try {
    doc = JSON.parse(storage.get(titleID));
    if (!doc.revisions) {
      throw new Error("This is not a note!");
    }
  } catch (_e) {
    return null;
  }

  const newerNote = doc
    ? Object.values(doc.revisions).reduce(
      // deno-lint-ignore no-explicit-any
      (acc: any, note: any) => note.dateCreated > acc.dateCreated ? note : acc,
      { dateCreated: 0 },
    )
    : {};

  const noteToReturn = revision ? doc.revisions[revision] : newerNote;

  return titleID
    ? {
      ...doc,
      id: titleID,
      ...(noteToReturn ? noteToReturn : {}),
      numberOfRevisions: doc && doc.revisions
        ? Object.keys(doc.revisions).length
        : undefined,
      title: doc.title,
    }
    : null;
};

export const disableSyncOnCurrentNote = (value: boolean) => {
  const note = getNote();
  if (note) {
    storage.update(note.id, {
      disableSync: value,
    });
    notify.info(
      `"${note.title}" cloud sync ${value ? "disabled 😶" : "enabled ⚡️"}`,
    );
  }
};

export const setNoteFromHash = (hash = url.getPageId()) => {
  if (hash) {
    const version = url.getSearchParam("v") || undefined;
    const note = getNote(undefined, version);
    if (note) {
      select("#revisions").html(
        `${note.numberOfRevisions} revision${
          note.numberOfRevisions > 1 ? "s" : ""
        }`,
      );
      setPageTitle(note.title);
      select(".terminal").setValue(note.text);
    }

    if (!note) {
      notify.error("404 Note not found 🤷‍♂️");
    }
  }
};

export const resetNoteManager = () => {
  location.hash = "";
  resetPageTitle();
  select("#revisions").html("");
  select(".terminal").setValue("").focus();
  setSavedState();
};

export const getTitle = (note = "") =>
  note.split("\n")[0].trim().replace("#", "").trim();

export const getTitleId = (note: string) => {
  const title = getTitle(note);
  return encodeTitle(title);
};

export const updateNote = async (what: string) => {
  if (what.length) {
    const titleID = getTitleId(what);
    const title = getTitle(what);
    const existingNote = getNote(titleID);
    if (existingNote === null) {
      // new existingNote
      return saveNote(what);
    }
    const { text } = existingNote;
    const hashOfIncomingNote = await hashBrowser(what);
    const hashOfCurrentNote = await hashBrowser(text);

    if (hashOfIncomingNote === hashOfCurrentNote) {
      return;
    }

    const currentNote = storage.get(titleID);
    const note = JSON.parse(currentNote);
    storage.set(
      titleID,
      JSON.stringify({
        ...note,
        title,
        revisions: {
          ...((note && note.revisions) || {}),
          [hashOfIncomingNote]: {
            dateCreated: Date.now(),
            text: what,
          },
        },
      }),
    );
  }
};

export const saveNote = async (
  what = select(".terminal").getValue(),
) => {
  await storage.saveToDictionary(what);
  if (what.length) {
    const hash = await hashBrowser(what);
    try {
      const title = what.split("\n")[0].trim().replace("#", "").trim();

      setPageTitle(title);

      const titleID = encodeTitle(title);
      const currentNote = storage.get(titleID);
      const note = JSON.parse(currentNote);
      storage.set(
        titleID,
        JSON.stringify({
          ...note,
          title,
          lines: what.split("\n"),
          revisions: {
            ...((note && note.revisions) || {}),
            [hash]: {
              dateCreated: Date.now(),
              text: what,
            },
          },
        }),
      );
      url.set(titleID, {
        v: hash,
      });
      storage.set("lastLocalUpdate", new Date());
      notify.success("👌 Note saved!");
      setSavedState();
    } catch (e) {
      notify.error(
        `😱 Something went wrong while trying to save to local storage ${e}`,
      );
    }
  } else {
    notify.warning("😕 Nothing to save!"); // eslint-disable-line
  }
};

export const getNotes = ({
  includeDeleted = false,
}: {
  includeDeleted?: boolean;
} = {}): Array<Note> =>
  Object.entries(localStorage)
    .filter(([, body]) => typeof body === "string")
    .filter(([id, body]) => !id.startsWith("__") && isJSON(body))
    .map(([id, body]) => [id, JSON.parse(body)])
    .filter(([, body]) => !!body.title) // check if title exists and therefore is a note
    .reduce((acc, [noteId]) => [...acc, getNote(noteId)], [])
    .filter(({ deleted }) => (includeDeleted ? true : !deleted));

export const search = (q: string | null = null) => {
  if (!q) {
    return undefined;
  }

  const results = getNotes()
    .map(({ id }) => getNote(id))
    .filter((note) => note !== null)
    .filter(({ text }) => {
      return text.toLowerCase().includes(q.toLowerCase());
    });

  return results[0];
};

export const deleteNote = () => {
  const confirmation = confirm("Are you sure you want do that?");
  if (confirmation) {
    const note = getNote();
    resetNoteManager();
    if (note && note.id) {
      deleteFileOnGist(note.id);
      markNoteForDeletion(note.id);
    }
  }
  commander.hide();
};
