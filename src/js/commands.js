import toggleMarkDownViewer from "./toggleMarkDownViewer";
import prettifyJSON from "./utils/prettifyJSON";
import storage from "./utils/localstorage";
import { mailTo } from "./utils/mail";

const commands = [
  {
    key: "m",
    call: toggleMarkDownViewer
  },
  {
    key: "j",
    call: () => prettifyJSON(".terminal")
  },
  {
    key: "s",
    call: () => {
      const note = document.querySelector(".terminal").value;
      storage.saveToLocalStorage(note);
    }
  },
  {
    key: "e",
    call: () => {
      const note = document.querySelector(".terminal").value;
      mailTo(note);
    }
  }
];

export default commands;
