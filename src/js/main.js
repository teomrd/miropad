import "../css/styles.css";
import "../css/print.css";
import "github-markdown-css";
import welcomeUser from "./components/molecules/welcome";
import errorHandler from "./utils/errorHandler";
import select from "./utils/dom";
import {
  setNoteFromHash,
  search,
  getNote,
  disableSyncOnCurrentNote,
  deleteNote,
} from "./components/organisms/noteManager/noteManager";
import { url } from "./utils/urlManager";
import { copyToClipboard } from "./utils/copyToClipboard";
import markDownViewer from "./components/organisms/markdown/markDownViewer";
import commander from "./components/organisms/commander/commander";
import { getGist } from "./utils/github/api";
import {
  syncNotesWithGitHub,
  setAuthTokenFromCallback,
} from "./utils/github/actions";
import { registerServiceWorker } from "./registerServiceWorker";
import { terminal } from "./components/organisms/terminal";
import { isSyncEnabled } from "./isSyncEnabled";
import "../js/components/web-components/editable-list";
import notify from "./components/molecules/notify";
import { resetPageTitle } from "./utils/pageTitle";
import { relativeDate } from "./utils/dates";
import { Trie } from "./utils/Trie/Trie";
import storage from "./utils/localstorage";

// Initialize a Trie tree to be used for the predictions
export const trieDictionary = Trie();

const setNoteFromRawUrl = async (rawUrl) => {
  if (rawUrl) {
    const response = await fetch(rawUrl).then((response) => {
      if (response.ok) return response.text();
      throw new Error(
        `Remote note could not be retrieved! code: ${response.status}`
      );
    });
    select(".terminal").setValue(response);
  }
};

const setNoteFromGist = async (gistId) => {
  if (gistId) {
    try {
      const gist = await getGist(gistId);
      const { files } = gist;
      const fileContents = Object.values(files);
      const [gistFile] = fileContents;
      const { content } = gistFile;
      select(".terminal").setValue(content);
    } catch (error) {
      notify.error("MiroPad note not found! 🤷‍♂️");
    }
  }
};

const actOnURLStateChange = async (e = {}) => {
  try {
    const { oldURL, newURL } = e;
    const oldPageId = url.getPageId(oldURL);
    const newPageId = url.getPageId(newURL);
    const hasPageIdChanged = oldPageId !== newPageId;
    const { v: oldV } = url.getParamsObject(oldURL);
    const { v: newV } = url.getParamsObject(newURL);
    const hasPageVersionChanged = oldV !== newV;
    const shouldChangeNote = [hasPageIdChanged, hasPageVersionChanged].some(
      (r) => r
    );
    if (shouldChangeNote) setNoteFromHash();

    const { gistId, raw } = url.getParamsObject(newURL);
    await setNoteFromGist(gistId);
    await setNoteFromRawUrl(raw);
  } catch (e) {
    notify.error(e.message);
  }

  const isANewNote = !url.getPageId();
  select("#note-info-button").show(!isANewNote);
  select("#new-note").disable(isANewNote);

  if (url.getSearchParam("md") === "full") {
    select(".terminal").hide();
  } else {
    select(".terminal").show();
  }

  if (url.getSearchParam("cid")) {
    select(".anchor").show();
  } else {
    select(".anchor").hide();
  }

  select(".note-info").hide();

  const q = url.getSearchParam("q");
  const queryResult = search(q);
  if (queryResult) select(".terminal").setValue(queryResult.text);
};

const initInfoPanel = () => {
  select("#note-info-close").listen("click", () => {
    select(".note-info").hide();
  });
  select("#note-info-button").listen("click", () => {
    const note = getNote();
    select(".note-info").show();

    select(".note-info .details").innerHTML(
      `<p>
      <label>
      Title
      </label>
      ${note.title}
      </p>
      <p>
        <label>
        Modified
        </label>
        ${relativeDate(note.dateCreated)}
      </p>
      <p>
        <label>
        No. of revisions
        </label>
        ${note.numberOfRevisions}
      </p>
      `
    );

    const isSyncOn = isSyncEnabled();
    if (isSyncOn && note) {
      const syncEl = (() => {
        const { disableSync } = note;
        const p = document.createElement("P");
        p.innerHTML = `
          <label>Sync</label>
            <label class="switch" title="Cloud Sync">
              <input id="sync" type="checkbox" ${!disableSync && "checked"}>
            <span class="slider round"></span>
          </label>
        `;
        return p;
      })();
      select(".note-info .details").append(syncEl);
      select("#sync").listen("click", (e) => {
        disableSyncOnCurrentNote(!e.target.checked);
      });
    }
    const deleteButton = (() => {
      const p = document.createElement("P");
      p.innerHTML = `
          <button
            class="icon-button"
            type="button"
            id="delete-note"
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="-3 -3 27.5 27.5">
              <path  d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z"></path>
              <path  d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
              <path  d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
              <path  d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z"></path>
            </svg>
            Delete
          </button>
        `;
      return p;
    })();
    select(".note-info .details").append(deleteButton);
    select("#delete-note").listen("click", () => {
      deleteNote();
    });
  });
};

const main = async () => {
  // Insert all the saved data from dictionary to the Trie tree
  const words = storage.getDictionary();
  trieDictionary.insert(words);

  window.addEventListener("error", errorHandler);
  welcomeUser();
  commander.init();

  initInfoPanel();

  terminal.init();
  resetPageTitle();
  setNoteFromHash(url.getPageId());
  select(".logo").listen("click", () => {
    commander.toggle(commander.getModes().notes);
  });
  select("#permalink").listen("click", async () => {
    await copyToClipboard(url.get());
  });

  markDownViewer.init();

  window.addEventListener("hashchange", actOnURLStateChange);
  actOnURLStateChange();

  registerServiceWorker();

  await syncNotesWithGitHub();
  await setAuthTokenFromCallback();
};

export default main;
