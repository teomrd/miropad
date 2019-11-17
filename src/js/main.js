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
  getCurrentNote
} from "./components/noteManager/noteManager";

const main = async () => {
  window.addEventListener("error", errorHandler);

  welcomeUser();

  commander.init();

  select(".terminal")
    .listen("focus", () => select("#commander").hide())
    .listen("keyup", () => {
      const currentNode = getCurrentNote();
      if (currentNode) {
        const { text = "" } = currentNode;
        if (select(".terminal").getValue() !== text) {
          select(".logo").addClass("unsaved");
        } else {
          select(".logo").removeClass("unsaved");
        }
      }
      // MarkDown on the fly
      markDownIt();
    });

  const hash = window.location.hash.substr(1);

  const ipfsNode = await IPFS.create();
  if (ipfs.isValidCid(hash)) {
    const retrievedValueFromIPFS = hash
      ? await ipfs.getFileContents(ipfsNode, hash)
      : "";
    select(".terminal").setValue(retrievedValueFromIPFS);
  } else {
    setNoteFromHash();
  }

  window.addEventListener("hashchange", () => setNoteFromHash());

  const q = new URL(window.location.href).searchParams.get("q");
  const queryResult = search(q);
  if (queryResult) select(".terminal").setValue(queryResult);

  select(".logo").listen("click", resetNoteManager);
};

export default main;
