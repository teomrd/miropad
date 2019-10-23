import toggleMarkDownViewer, { markDownIt } from "./toggleMarkDownViewer";
import prettifyJSON from "./utils/prettifyJSON";
import storage from "./utils/localstorage";
import { mailTo } from "./utils/mail";
import select from "./utils/dom";

export const toggleCommandPalette = () => {
  select("#commander").toggle();
  select("#commander input").focus();
};

export const commands = [
  {
    title: "💾 Save",
    key: "s",
    call: () => {
      storage.saveToLocalStorage(select(".terminal").getValue());
    }
  },
  {
    title: "📡 Save to IPFS",
    key: "i",
    call: () => {
      storage.saveToIPFS(select(".terminal").getValue());
    }
  },
  {
    title: "📬 Email note to...",
    key: "e",
    call: () => {
      const note = `${document.querySelector(".terminal").value} \n ${
        window.location.href
      }`;
      mailTo(note);
    }
  },
  {
    title: "🖨 Print MarkDown output",
    key: null,
    call: () => {
      select(".preview").show();
      markDownIt();
      window.print();
    }
  },
  {
    title: "🔳 Toggle MarkDown Viewer",
    key: "m",
    call: toggleMarkDownViewer
  },
  {
    key: "j",
    title: "💄 Prettify JSON document",
    call: () => prettifyJSON(".terminal")
  },
  {
    title: "🎨 Toggle command palette",
    key: "p",
    call: toggleCommandPalette
  }
];

export const generateCommands = async (value = "") => {
  select("#commands").html("");
  commands
    .filter(({ title }) => title.toLowerCase().includes(value.toLowerCase()))
    .map(({ title, key, call }, i) => {
      const li = document.createElement("LI");
      li.className = i === 0 ? "selected" : "";
      li.onclick = () => {
        call();
        select(".terminal").focus();
      };
      li.appendChild(document.createTextNode(title));
      const span = document.createElement("span");
      if (key) {
        span.appendChild(document.createTextNode(`⌘+${key.toUpperCase()}`));
      }
      li.appendChild(span);
      select("#commands").append(li);
    });
};

export const initCommander = async () => {
  select("#commander input").listen("keyup", e => {
    generateCommands(e.target.value);

    // enter
    if (e.keyCode === 13) {
      select("#commands li.selected").click();
    }
    // escape
    if (e.keyCode === 27) {
      select(".terminal").focus();
    }
  });

  await generateCommands();
};
