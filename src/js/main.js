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
import { setPageTitle, resetPageTitle } from "./utils/pageTitle";

const setNoteFromHash = hash => {
  const hashWithVersion = hash.split("?");
  const title = hashWithVersion[0];
  const doc = JSON.parse(storage.getLocalValue(title));
  const revision = hashWithVersion[1]
    ? hashWithVersion[1].replace("v=", "")
    : undefined; // get just the revision id
  if (doc) {
    const newerNote = Object.values(doc.revisions).reduce(
      (acc, note) => {
        return note.dateCreated > acc.dateCreated ? note : acc;
      },
      {
        dateCreated: 0
      }
    );
    const note = revision ? doc.revisions[revision].text : newerNote.text;
    const revisionsCount = Object.keys(doc.revisions).length;
    select("#revisions").html(
      `${revisionsCount} revision${revisionsCount > 1 ? "s" : ""}`
    );
    setPageTitle(decodeURIComponent(title));
    select(".terminal").setValue(note);
  } else {
    select(".terminal").setValue("");
  }
};

const main = async () => {
  const suggestion = document.querySelector(".suggestion");
  const terminal = document.querySelector(".terminal");
  window.addEventListener("error", errorHandler);

  welcomeUser();

  commander.init();

  select(".terminal")
    .listen("focus", () => select("#commander").hide())
    .listen("keydown", () => select(".logo").addClass("unsaved"))
    .listen("keyup", () => {
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
    setNoteFromHash(hash);
  }

  window.addEventListener("hashchange", () =>
    setNoteFromHash(window.location.hash.substr(1))
  );

  const q = new URL(window.location.href).searchParams.get("q");
  const queryResult = search(q);
  if (queryResult) select(".terminal").setValue(queryResult);

  select(".logo").listen("click", () => {
    location.hash = "";
    resetPageTitle();
    select("#revisions").html("");
  });
};

export default main;
