import "../css/styles.css";
import storage from "./utils/localstorage";
import welcomeUser from "./welcome";
import keyListener from "./utils/keyListener";
import errorHandler from "./utils/errorHandler";
import search from "./utils/search";
import { markDownIt } from "./toggleMarkDownViewer";
import getCaretCoordinates from "textarea-caret";
import { commands, initCommander } from "./commands";
import select from "./utils/dom";

const main = () => {
  const suggestion = document.querySelector(".suggestion");
  const terminal = document.querySelector(".terminal");
  window.addEventListener("error", errorHandler);

  welcomeUser();

  keyListener.listen().on(commands);
  select(".terminal")
    .listen("focus", () => select("#commander").hide())
    .listen("keyup", () => {
      // MarkDown on the fly
      markDownIt();
      const dictionary = storage.getDictionary();
      const lastWord = terminal.value.split(" ").pop();

      if (lastWord.length > 1) {
        const matches = dictionary.filter(word => word.startsWith(lastWord));
        const firstMatch = matches.shift();
        const prediction = firstMatch || "";
        storage.set("prediction", prediction);
        suggestion.innerHTML = prediction.replace(lastWord, "");
      }
    });

  initCommander();

  const savedTxt = storage.getSavedState();
  terminal.value = savedTxt;
  terminal.addEventListener("input", function() {
    var caret = getCaretCoordinates(this, this.selectionEnd);
    suggestion.style.top = caret.top - caret.height / 3;
    suggestion.style.left = caret.left;
  });

  terminal.addEventListener("keydown", async e => {
    if (e.which === 9) {
      e.preventDefault();
      const pred = await localStorage.getItem("prediction");
      const allTextArray = terminal.value.split(" ");
      terminal.value.split(" ").pop();
      allTextArray[allTextArray.length - 1] = pred;
      allTextArray[allTextArray.length] = "";
      if (pred && pred.length) {
        terminal.value = allTextArray.toString().replace(/,/g, " ");
        suggestion.innerHTML = "";
        storage.set("prediction", "");
      }
    }
  });

  const q = new URL(window.location.href).searchParams.get("q");
  const queryResult = search(q);
  if (queryResult) terminal.value = queryResult;
};

export default main;
