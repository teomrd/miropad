import "../css/styles.css";
import prettifyJSON from "./utils/prettifyJSON";
import storage from "./utils/localstorage";
import welcomeUser from "./welcome";
import keyListener from "./utils/keyListener";
import errorHandler from "./utils/errorHandler";
import search from "./utils/search";
import toggleMarkDownViewer from "./toggleMarkDownViewer";

const main = () => {
  window.addEventListener("error", errorHandler);

  welcomeUser();

  keyListener
    .listen()
    .on("m", () => toggleMarkDownViewer())
    .on("p", () => prettifyJSON(".terminal"))
    .on("s", () => {
      const text = document.querySelector(".terminal").value;
      storage.saveToLocalStorage(text);
    });

  const savedTxt = storage.getSavedState();
  document.querySelector(".terminal").value = savedTxt;

  const q = new URL(window.location.href).searchParams.get("q");
  const queryResult = search(q);
  if (queryResult) document.querySelector(".terminal").value = queryResult;
};

export default main;
