import toggleMarkDownViewer from "./toggleMarkDownViewer";
import prettifyJSON from "./utils/prettifyJSON";
import storage from "./utils/localstorage";

const commands = [
  {
    key: "m",
    call: toggleMarkDownViewer
  },
  {
    key: "p",
    call: () => prettifyJSON(".terminal")
  },
  {
    key: "s",
    call: () => {
      const text = document.querySelector(".terminal").value;
      storage.saveToLocalStorage(text);
    }
  }
];

export default commands;
