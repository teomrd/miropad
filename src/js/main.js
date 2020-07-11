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
} from "./components/organisms/noteManager/noteManager";
import { url } from "./utils/urlManager";
import { copyToClipboard } from "./utils/copyToClipboard";
import markDownViewer from "./components/organisms/markDownViewer";
import commander from "./components/organisms/commander/commander";
import {
  syncNotesWithGitHub,
  setAuthTokenFromCallback,
} from "./utils/github/actions";
import { registerServiceWorker } from "./registerServiceWorker";
import { initTerminal } from "./components/organisms/terminal";
import { isSyncEnabled } from "./isSyncEnabled";
import "../js/components/web-components/editable-list";
import notify from "./components/molecules/notify";
import { resetPageTitle } from "./utils/pageTitle";
import { relativeDate } from "./utils/dates";

const actOnURLStateChange = (e = {}) => {
  try {
    const { oldURL, newURL } = e;
    const oldPageId = url.getPageId(oldURL);
    const newPageId = url.getPageId(newURL);
    const hasPageIdChanged = oldPageId !== newPageId;
    const { v: oldV } = url.getParamsObject(oldURL);
    const { v: newV } = url.getParamsObject(newURL);
    const hasPageVersionChanged = oldV !== newV;
    const shouldChangeNote = [hasPageIdChanged, hasPageVersionChanged].some(
      (r) => r === true
    );
    if (shouldChangeNote) setNoteFromHash();
  } catch (e) {
    notify.error(e.message);
  }

  const isANewNote = !url.getPageId();
  select("#note-info-button").show(!isANewNote);

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
  });
};

const main = async () => {
  window.addEventListener("error", errorHandler);
  welcomeUser();
  commander.init();

  initInfoPanel();

  initTerminal();
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
