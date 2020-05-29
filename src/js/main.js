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
} from "./components/organisms/noteManager/noteManager";
import { url } from "./utils/urlManager";
import { copyToClipboard } from "./utils/copyToClipboard";
import markDownViewer from "./components/organisms/markDownViewer";
import commander from "./components/organisms/commander/commander";
import {
  syncNotesWithGitHub,
  setAuthTokenFromCallback,
} from "./utils/github/actions";
import {
  registerServiceWorker,
  requestNotificationPermission,
} from "./registerServiceWorker";
import { initTerminal } from "./components/organisms/terminal";

const actOnURLStateChange = () => {
  setNoteFromHash();

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

  registerServiceWorker();

  await syncNotesWithGitHub();
  await setAuthTokenFromCallback();
};

export default main;
