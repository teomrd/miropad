import IPFS from "ipfs";
import "../css/styles.css";
import "../css/print.css";
import "github-markdown-css";
import storage from "./utils/localstorage";
import welcomeUser from "./welcome";
import errorHandler from "./utils/errorHandler";
import search from "./utils/search";
import { markDownIt } from "./toggleMarkDownViewer";
import getCaretCoordinates from "textarea-caret";
import select from "./utils/dom";
import ipfs from "./utils/ipfs";
import commander from "./components/commander/commander";
import {
  setNoteFromHash,
  resetNoteManager,
  getCurrentNote
} from "./components/noteManager/noteManager";
import { registerSW } from "./components/serviceWorkers/register";

const main = async () => {
  const suggestion = document.querySelector(".suggestion");
  const terminal = document.querySelector(".terminal");
  window.addEventListener("error", errorHandler);

  welcomeUser();

  commander.init();

  select(".terminal")
    .listen("focus", () => select("#commander").hide())
    .listen("keyup", () => {
      const { text } = getCurrentNote();
      console.log("ter", select(".terminal").getValue());
      console.log("text", text);
      if (select(".terminal").getValue() !== text) {
        select(".logo").addClass("unsaved");
      } else {
        select(".logo").removeClass("unsaved");
      }

      // MarkDown on the fly
      markDownIt();
      const dictionary = storage.getDictionary();
      const lastWord = select(".terminal")
        .getValue()
        .split(" ")
        .pop();

      if (lastWord.length > 1) {
        const matches = dictionary.filter(word => word.startsWith(lastWord));
        const firstMatch = matches.shift();
        const prediction = firstMatch || "";
        storage.set("prediction", prediction);
        suggestion.innerHTML = prediction.replace(lastWord, "");
      }
    });

  terminal.addEventListener("input", function() {
    var caret = getCaretCoordinates(this, this.selectionEnd);
    suggestion.style.top = caret.top - caret.height / 3;
    suggestion.style.left = caret.left;
  });

  terminal.addEventListener("keydown", async e => {
    if (e.which === 9) {
      e.preventDefault();
      const pred = await localStorage.getItem("prediction");
      const allTextArray = select(".terminal")
        .getValue()
        .split(" ");
      select(".terminal")
        .getValue()
        .split(" ")
        .pop();
      allTextArray[allTextArray.length - 1] = pred;
      allTextArray[allTextArray.length] = "";
      if (pred && pred.length) {
        select(".terminal").setValue(
          allTextArray.toString().replace(/,/g, " ")
        );
        suggestion.innerHTML = "";
        storage.set("prediction", "");
      }
    }
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

  registerSW("./sw.js");
};

export default main;
