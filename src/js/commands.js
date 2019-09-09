import toggleMarkDownViewer from "./toggleMarkDownViewer";
import prettifyJSON from "./utils/prettifyJSON";
import storage from "./utils/localstorage";

const commands = [
  {
    title: "Toggle MarkDown Viewer",
    key: "m",
    call: toggleMarkDownViewer
  },
  {
    title: "Prettify JSON document",
    key: "p",
    call: () => prettifyJSON(".terminal")
  },
  {
    title: "Save",
    key: "s",
    call: () => {
      const text = document.querySelector(".terminal").value;
      storage.saveToLocalStorage(text);
    }
  }
];

export default commands;
