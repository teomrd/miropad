import "../css/styles.css";
import prettifyJSON from "./utils/prettifyJSON";
import storage from "./utils/localstorage";
import welcomeUser from "./welcome";
import keyListener from "./utils/keyListener";
import errorHandler from "./utils/errorHandler";
import search from "./utils/search";
import toggleMarkDownViewer from "./toggleMarkDownViewer";
import notify from "./notify";

const main = () => {
  const terminal = document.querySelector(".terminal");
  window.addEventListener("error", errorHandler);

  welcomeUser();

  keyListener
    .listen()
    .on("m", () => toggleMarkDownViewer())
    .on("p", () => prettifyJSON(".terminal"))
    .on("s", () => {
      const text = terminal.value;
      storage.saveToLocalStorage(text);
    });

  const savedTxt = storage.getSavedState();
  terminal.value = savedTxt;
  terminal.onkeyup = () => {
    const dictionary = storage.getDictionary();
    const lastWord = terminal.value.split(" ").pop();
    const matches = dictionary.filter(word => word.startsWith(lastWord));
    const fistMatch = matches.shift();
    const prediction = fistMatch || "";
    notify.info(prediction);
    storage.set("prediction", prediction);
  };

  terminal.addEventListener("keydown", async e => {
    if (e.which === 9) {
      e.preventDefault();
      const allTextArray = terminal.value.split(" ");
      terminal.value.split(" ").pop();
      const pred = await localStorage.getItem("prediction");
      allTextArray[allTextArray.length - 1] = pred;
      allTextArray[allTextArray.length] = "";
      terminal.value = allTextArray.toString().replace(/,/g, " ");
    }
  });

  const q = new URL(window.location.href).searchParams.get("q");
  const queryResult = search(q);
  if (queryResult) terminal.value = queryResult;
};

export default main;
