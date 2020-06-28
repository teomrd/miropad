import "../css/styles.css";
import "../css/print.css";
import "github-markdown-css";
import welcomeUser from "./components/molecules/welcome";
import errorHandler from "./utils/errorHandler";
import select from "./utils/dom";
import {
  setNoteFromHash,
  resetNoteManager,
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

const actOnURLStateChange = (e) => {
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

  const isSyncOn = isSyncEnabled();
  const currentNote = getNote();
  if (isSyncOn && currentNote) {
    const { disableSync = false } = currentNote;
    select(".switch").show();
    select("#sync").checked(!disableSync);
  } else {
    select(".switch").hide();
  }

  const q = url.getSearchParam("q");
  const queryResult = search(q);
  if (queryResult) select(".terminal").setValue(queryResult.text);
};

const main = async () => {
  window.addEventListener("error", errorHandler);
  welcomeUser();
  commander.init();

  initTerminal();

  setNoteFromHash(url.getPageId());
  select(".logo").listen("click", resetNoteManager);
  select("#permalink").listen("click", async () => {
    await copyToClipboard(url.get());
  });

  markDownViewer.init();

  window.addEventListener("hashchange", actOnURLStateChange);
  actOnURLStateChange();

  select("#sync").listen("click", (e) => {
    disableSyncOnCurrentNote(!e.target.checked);
  });

  registerServiceWorker();

  await syncNotesWithGitHub();
  await setAuthTokenFromCallback();
};

export default main;
