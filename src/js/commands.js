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
    title: "📒 List saved notes",
    key: "p",
    call: () => {
      toggleCommandPalette();
      select("#commander input").setValue("");
    }
  },
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
    key: "shift p",
    call: () => {
      toggleCommandPalette();
      select("#commander input").setValue("> ");
    }
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

export const generateNotes = (value = "") => {
  select("#notes").html("");
  Object.keys(localStorage)
    .filter(key =>
      storage
        .get(key)
        .toLowerCase()
        .includes(value.toLowerCase())
    )
    .slice(0, 10)
    .map((key, i) => {
      const item = storage.get(key).slice(0, 100);
      const li = document.createElement("LI");
      li.className = i === 0 ? "selected" : "";
      const a = document.createElement("a");
      a.href = `${window.location.origin}/miropad#${key}`;
      a.appendChild(document.createTextNode(item));
      li.appendChild(a);
      select("#notes").append(li);
    });
};

export const initCommander = async () => {
  select("#commander input").listen("keyup", e => {
    if (e.target.value.slice(0, 1) === ">") {
      generateCommands(e.target.value.slice(1, -1).trim());
      select("#commands").show();
      select("#notes").hide();
      select("#commander input").placeholder("Search for commands...");
    } else {
      generateNotes(e.target.value);
      select("#notes").show();
      select("#commands").hide();
      select("#commander input").placeholder("Search for saved notes...");
    }

    // enter
    if (e.keyCode === 13) {
      select("#commands li.selected").click();
    }
    // escape
    if (e.keyCode === 27) {
      select(".terminal").focus();
    }
  });

  generateCommands();
};
