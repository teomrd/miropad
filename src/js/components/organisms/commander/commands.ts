import {
  deleteNote,
  getNote,
  getNotes,
  resetNoteManager,
  saveNote,
} from "../noteManager/noteManager.ts";
import select from "../../../utils/dom.js";
import storage from "../../../utils/localstorage.js";
import { isUserLoggedIn } from "../../../utils/isUserLoggedIn.js";
import {
  goAuthenticate,
  setGistToSyncWith,
  syncNotesWithGitHub,
} from "../../../utils/github/actions.js";
import commander from "./commander.ts";
import {
  saveDataToFile,
  saveFileAs,
} from "../../../utils/fileSystem/fileSystem.ts";
import { url } from "../../../utils/urlManager.ts";
import { mailTo } from "../../../utils/mail.js";
import markDownViewer from "../markdown/markDownViewer.js";
import prettifyJSON from "../../../utils/prettifyJSON.js";
import notify from "../../molecules/notify.ts";
import { copyToClipboard } from "../../../utils/copyToClipboard.ts";
import { sleep } from "../../../utils/sleep.js";
import { publishGist, updateGist } from "../../../utils/github/api.ts";
import { icon } from "../../atoms/icon/icon.js";
// @ts-types="../../../../../types.d.ts"
import ListSVG from "../../../../assets/svg/list.svg";
// @ts-types="../../../../../types.d.ts"
import TrashSVG from "../../../../assets/svg/trash.svg";
// @ts-types="../../../../../types.d.ts"
import CheckmarkCircleSVG from "../../../../assets/svg/checkmark-circle.svg";
// @ts-types="../../../../../types.d.ts"
import CloudSyncSVG from "../../../../assets/svg/cloud-sync.svg";
// @ts-types="../../../../../types.d.ts"
import LighterSVG from "../../../../assets/svg/lighter.svg";
// @ts-types="../../../../../types.d.ts"
import EnterDownSVG from "../../../../assets/svg/enter-down.svg";
// @ts-types="../../../../../types.d.ts"
import DownloadSVG from "../../../../assets/svg/download.svg";
// @ts-types="../../../../../types.d.ts"
import EnvelopeSVG from "../../../../assets/svg/envelope.svg";
// @ts-types="../../../../../types.d.ts"
import BugSVG from "../../../../assets/svg/bug.svg";
// @ts-types="../../../../../types.d.ts"
import PictureSVG from "../../../../assets/svg/picture.svg";
// @ts-types="../../../../../types.d.ts"
import PrinterSVG from "../../../../assets/svg/printer.svg";
// @ts-types="../../../../../types.d.ts"
import PageBreakSVG from "../../../../assets/svg/page-break.svg";
// @ts-types="../../../../../types.d.ts"
import FrameExpandSVG from "../../../../assets/svg/frame-expand.svg";
// @ts-types="../../../../../types.d.ts"
import ArrowRightCircleSVG from "../../../../assets/svg/arrow-right-circle.svg";
// @ts-types="../../../../../types.d.ts"
import MagicWandSVG from "../../../../assets/svg/magic-wand.svg";
// @ts-types="../../../../../types.d.ts"
import RocketSVG from "../../../../assets/svg/rocket.svg";
// @ts-types="../../../../../types.d.ts"
import SpellCheckSVG from "../../../../assets/svg/spell-check.svg";
// @ts-types="../../../../../types.d.ts"
import PencilSVG from "../../../../assets/svg/pencil.svg";
// @ts-types="../../../../../types.d.ts"
import ShareSVG from "../../../../assets/svg/exit-up.svg";
// @ts-types="../../../../../types.d.ts"
import LeafSVG from "../../../../assets/svg/leaf.svg";
// @ts-types="../../../../../types.d.ts"
import { share } from "../../../utils/webShare.js";
import { setSavedState } from "../../../ui/functions/savedState.ts";

const getSyncTitle = () => {
  const gistId = storage.get("gistId");
  const authToken = storage.get("authToken");
  if (!authToken) {
    return "Sync: Authorize your GitHub account for synchronisation";
  }
  if (!gistId) {
    return "Sync: Pick your Gist to sync with";
  }
  return "Sync: Notes with my GitHub Gist";
};

const shareNoteCommand = {
  title: "Share note",
  icon: icon(ShareSVG, "share note"),
  sortTitle: "Share",
  call: share,
};

const sharePublicLinkCommand = {
  title: "Share public link",
  key: null,
  icon: icon(ShareSVG, "share public link"),
  sortTitle: "Share public link",
  call: async () => {
    commander.hide();
    await saveNote(select(".terminal").getValue());
    const note = getNote();
    if (note) {
      const response = await publishGist({
        note,
      });
      const rawLink = response.history[0].url;
      const gitResponse = await fetch(rawLink).then((response) =>
        response.json()
      );
      const { files } = gitResponse;
      const fileContents = Object.values(files);
      const [gistFile] = fileContents;
      const { raw_url: rawUrl } = gistFile as { raw_url: string };
      const linkToShare = `${url.baseUrl}?raw=${rawUrl}`;
      const successMessage = "MiroPad public link copied to clipboard 📋!";
      copyToClipboard(linkToShare, successMessage);
    }
  },
};

export const commands = () => {
  return [
    {
      title: "New note",
      icon: icon(PencilSVG, "new note"),
      sortTitle: "New",
      key: "n",
      call: resetNoteManager,
    },
    {
      title: "Save",
      key: "s",
      icon: icon(CheckmarkCircleSVG, "save note"),
      sortTitle: "Save",
      call: async () => {
        commander.hide();
        await saveNote(select(".terminal").getValue());
        const note = getNote();
        if (note && !note.disableSync) {
          updateGist([note]);
        }
        setSavedState();
      },
    },
    // @ts-ignore ts cannot cope with browser mess
    ...(navigator.share ? [shareNoteCommand] : []),
    {
      title: "Toggle MarkDown Viewer",
      icon: icon(PageBreakSVG, "toggle markdown viewer", "rotate90"),
      sortTitle: "Split",
      key: "m",
      call: () => {
        markDownViewer.toggle();
        commander.hide();
      },
    },
    {
      title: "Full MarkDown view",
      icon: icon(FrameExpandSVG, "full view mode"),
      sortTitle: "Full view",
      key: "shift m",
      call: () => {
        markDownViewer.toggle("full");
        commander.hide();
      },
    },
    ...(isUserLoggedIn() ? [sharePublicLinkCommand] : []),
    {
      title: "Zen mode",
      icon: icon(LeafSVG, "switch to zen mode"),
      sortTitle: "Zen mode",
      key: "shift z",
      call: () => {
        const isZen = Boolean(url.getSearchParam("zen"));
        if (isZen) {
          url.deleteParam("zen");
        } else {
          url.set(undefined, {
            zen: true,
          });
        }
        commander.hide();
      },
    },
    {
      title: "List saved notes",
      icon: icon(ListSVG, "list notes"),
      sortTitle: "Notes",
      key: "p",
      call: () => commander.toggle(commander.getModes().notes),
    },
    {
      title: "Delete note",
      key: "shift d",
      icon: icon(TrashSVG, "delete note"),
      sortTitle: "Delete",
      call: deleteNote,
    },
    {
      title: getSyncTitle(),
      icon: icon(CloudSyncSVG, "sync with github"),
      key: null,
      call: async () => {
        const token = storage.get("authToken");
        if (!token) {
          return goAuthenticate();
        }
        const gistId = storage.get("gistId");
        if (!gistId) {
          return await setGistToSyncWith(token);
        }
        commander.hide();
        await syncNotesWithGitHub();
      },
    },
    {
      title: "Sync: Reset Gist settings",
      icon: icon(LighterSVG, "reset github settings"),
      key: null,
      call: () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("gistId");
        localStorage.removeItem("lastLocalUpdate");
        localStorage.removeItem("lastSync");
        notify.info("Gist setting have been reset!");
        commander.hide();
      },
    },
    {
      title: "Toggle sidebar",
      experimental: true,
      key: "shift l",
      call: () => {
        select("aside").toggle();
      },
    },
    {
      title: "Save to File System...",
      experimental: true,
      icon: icon(EnterDownSVG, "save file"),
      key: "shift s",
      call: () => {
        const note = getNote();
        if (note) {
          const { text, title } = note;
          saveFileAs(text, title);
          commander.hide();
        }
      },
    },
    {
      title: "Email note to...",
      experimental: true,
      icon: icon(EnvelopeSVG, "email"),
      key: "e",
      call: () => {
        const note = select(".terminal").getValue();
        mailTo(note);
        commander.hide();
      },
    },
    {
      title: "Toggle experimental features",
      experimental: false,
      icon: icon(BugSVG, "lab"),
      key: null,
      call: () => {
        const previousStatus = Boolean(storage.get("__experimental__"));

        if (previousStatus) {
          storage.remove("__experimental__");
        } else {
          storage.set("__experimental__", true);
        }
        notify.showNotification(
          `Experimental features turned ${previousStatus ? "off" : "on"}`,
        );
        commander.hide();
      },
    },
    {
      title: "Toggle Autocompletion",
      experimental: false,
      icon: icon(ArrowRightCircleSVG, "autocompletion"),
      key: null,
      call: () => {
        const previousStatus = Boolean(storage.get("__autocomplete__"));

        if (previousStatus) {
          storage.remove("__autocomplete__");
        } else {
          storage.set("__autocomplete__", true);
        }
        notify.showNotification(
          `Autocomplete feature turned ${previousStatus ? "off" : "on"}`,
        );
        commander.hide();
        select(".terminal").focus();
      },
    },
    {
      title: "Add a cover picture",
      experimental: true,
      icon: icon(PictureSVG, "cover picture"),
      key: null,
      call: async () => {
        const bgImage = prompt("Paste the image URL in here...");
        commander.hide();
        await sleep(200); // need to wait after prompt for some reason before copy
        copyToClipboard(
          `![bg](${bgImage}){.cover}`,
          "👌Copied! Paste the code on the MiroPad editor",
        );
        select(".terminal").focus();
        notify.info(
          "Paste the cover picture wherever you prefer on the MirPad editor",
        );
      },
    },
    {
      title: "Print MarkDown output",
      experimental: true,
      icon: icon(PrinterSVG, "print"),
      key: null,
      call: () => {
        select(".preview").show();
        markDownViewer.init();
        globalThis.print();
        commander.hide();
      },
    },
    {
      key: "j",
      title: "Prettify JSON document",
      icon: icon(MagicWandSVG, "prettify json"),
      call: () => {
        prettifyJSON(".terminal");
        commander.hide();
      },
    },
    {
      title: "Toggle command palette",
      icon: icon(RocketSVG, "toggle command palette"),
      key: ["shift p", "k"],
      call: () => commander.toggle(commander.getModes().commands),
    },
    {
      title: "Find and Replace...",
      experimental: true,
      icon: icon(SpellCheckSVG, "find and replace"),
      key: "shift f",
      call: () => {
        const selectedValue = select(".terminal")
          .getValue()
          .slice(
            select(".terminal").el.selectionStart,
            select(".terminal").el.selectionEnd,
          );
        const valueToFind = prompt("What do you wanna find?", selectedValue);
        if (!valueToFind) {
          return notify.info("Value not found");
        }
        const positionOfFirstChar = select(".terminal")
          .getValue()
          .indexOf(valueToFind);

        select(".terminal").el.setSelectionRange(
          positionOfFirstChar,
          positionOfFirstChar + valueToFind.length,
        );
        const replacementValue = prompt(`Replace ${valueToFind} with...`);
        if (replacementValue) {
          select(".terminal").el.setRangeText(replacementValue);
        }
      },
    },
    {
      title: "Download all notes!",
      icon: icon(DownloadSVG, "Download all notes on your local file system"),
      call: () => {
        const notes = getNotes({
          includeDeleted: true,
        });
        saveDataToFile(notes);
        commander.hide();
      },
    },
    {
      title: "Permanently delete ALL notes ❗",
      icon: icon(TrashSVG, "delete note"),
      call: () => {
        const confirmation = confirm(
          "Are you sure you want do delete ALL your notes?",
        );
        if (confirmation) {
          const notes = getNotes({
            includeDeleted: true,
          });
          notes.forEach((note) => {
            storage.remove(note.id);
          });
          resetNoteManager();
        }
        commander.hide();
      },
    },
  ] as const;
};
