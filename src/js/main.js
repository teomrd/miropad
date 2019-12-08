import IPFS from "ipfs";
import "../css/styles.css";
import "../css/print.css";
import "github-markdown-css";
import welcomeUser from "./welcome";
import errorHandler from "./utils/errorHandler";
import search from "./utils/search";
import { markDownIt } from "./toggleMarkDownViewer";
import select from "./utils/dom";
import ipfs from "./utils/ipfs";
import commander from "./components/commander/commander";
import {
  setNoteFromHash,
  resetNoteManager,
  getNote,
  saveNote
} from "./components/noteManager/noteManager";
import notify from "./notify";
import { url } from "./utils/urlManager";

const initURLState = () => {
  setNoteFromHash();

  if (url.getSearchParam("md") === "full") {
    select(".terminal").hide();
  } else {
    select(".terminal").show();
  }

  const q = url.getSearchParam("q");
  const queryResult = search(q);
  if (queryResult) select(".terminal").setValue(queryResult.text);
};

const main = async () => {
  window.addEventListener("error", errorHandler);

  welcomeUser();

  commander.init();

  select(".terminal")
    .listen("focus", () => select("#commander").hide())
    .listen("keydown", e => {
      if (e.keyCode === 9) {
        e.preventDefault();
        select(".terminal").insertAtCaret("  ");
      }
    })
    .listen("keyup", () => {
      const currentNode = getNote();
      if (currentNode) {
        const { text = "" } = currentNode;
        if (select(".terminal").getValue() !== text) {
          select(".logo").addClass("unsaved");
        } else {
          select(".logo").removeClass("unsaved");
        }
      }
    })
    .listen("input", () => markDownIt());

  const pageId = url.getPageId();

  if (ipfs.isValidCid(pageId)) {
    try {
      const ipfsNode = await IPFS.create();
      const retrievedValueFromIPFS = pageId
        ? await ipfs.getFileContents(ipfsNode, pageId)
        : "";
      select(".terminal").setValue(retrievedValueFromIPFS);
      await saveNote(retrievedValueFromIPFS, pageId);
    } catch (error) {
      console.log("IPFS Error", error);
    }
  } else {
    setNoteFromHash();
  }

  select(".logo").listen("click", resetNoteManager);
  select("#permalink").listen("click", async () => {
    await navigator.clipboard.writeText(url.get());
    notify.success("🔗 Link copied to clipboard");
  });

  markDownIt().init();

  window.addEventListener("hashchange", initURLState);
  initURLState();
};

export default main;
