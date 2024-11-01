import "github-markdown-css";
import "../css/print.css";
import "../css/styles.css";
import welcomeUser from "./components/molecules/welcome.js";
import commander from "./components/organisms/commander/commander.ts";
import markDownViewer from "./components/organisms/markdown/markDownViewer.js";
import {
  deleteNote,
  disableSyncOnCurrentNote,
  getNote,
  setNoteFromHash,
} from "./components/organisms/noteManager/noteManager.ts";
import { terminal } from "./components/organisms/terminal.ts";
import { isSyncEnabled } from "./isSyncEnabled.js";
import { registerServiceWorker } from "./registerServiceWorker.js";
import { Trie } from "./utils/Trie/Trie.ts";
import { copyToClipboard } from "./utils/copyToClipboard.js";
import { relativeDate } from "./utils/dates.js";
import select from "./utils/dom.js";
import errorHandler from "./utils/errorHandler.js";
import {
  setAuthTokenFromCallback,
  syncNotesWithGitHub,
} from "./utils/github/actions.js";
import storage from "./utils/localstorage.js";
import { resetPageTitle } from "./utils/pageTitle.js";
import { url } from "./utils/urlManager.js";
import { actOnURLStateChange } from "./listeners/urlChange.ts";
import { autoMagicallyCheckBoxes } from "./ui/markdown/preview/autoMagicallyCheckBoxes.js";

// Initialize a Trie tree to be used for the predictions
export const trieDictionary = Trie();

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
      `,
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

  globalThis.addEventListener("error", errorHandler);
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

  globalThis.addEventListener("hashchange", actOnURLStateChange);
  actOnURLStateChange();

  registerServiceWorker();

  autoMagicallyCheckBoxes();

  await syncNotesWithGitHub();
  await setAuthTokenFromCallback();
};

export default main;
