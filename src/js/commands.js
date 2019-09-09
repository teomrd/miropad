import toggleMarkDownViewer from "./toggleMarkDownViewer";
import prettifyJSON from "./utils/prettifyJSON";
import storage from "./utils/localstorage";
import { mailTo } from "./utils/mail";

const commands = [
  {
    title: "Toggle MarkDown Viewer",
    key: "m",
    call: toggleMarkDownViewer
  },
  {
    key: "j",
    title: "Prettify JSON document",
    call: () => prettifyJSON(".terminal")
  },
  {
    title: "Save",
    key: "s",
    call: () => {
      const note = document.querySelector(".terminal").value;
      storage.saveToLocalStorage(note);
    }
  },
  {
    title: "Email note to...",
    key: "e",
    call: () => {
      const note = document.querySelector(".terminal").value;
      mailTo(note);
    }
  }
];

export default commands;
