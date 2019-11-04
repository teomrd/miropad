import toggleMarkDownViewer, { markDownIt } from "../../toggleMarkDownViewer";
import prettifyJSON from "../../utils/prettifyJSON";
import { mailTo } from "../../utils/mail";
import keyListener from "../../utils/keyListener";
import select from "../../utils/dom";
import storage from "../../utils/localstorage";
import isJSON from "../../utils/isJSON";

const toggleCommandPalette = () => {
  select("#commander").toggle();
  select("#commander input").focus();
};

const commanderModes = {
  off: "off",
  notes: "notes",
  commands: "commands"
};

const commander = {
  state: {
    mode: commanderModes.off
  },
  commands: [
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
  ],
  initCommander: function() {
    select("#commander input").listen("keyup", e => {
      if (e.target.value.slice(0, 1) === ">") {
        this.generateCommands(e.target.value.slice(1, -1).trim());
        select("#commands").show();
        select("#notes").hide();
        select("#commander input").placeholder("Search for commands...");
      } else {
        this.generateNotes(e.target.value);
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

    this.generateCommands();
    return this;
  },
  init: function() {
    this.initCommander();
    keyListener.listen().on(this.commands);
    select(".menu").listen("click", toggleCommandPalette);
    return this;
  },
  generateNotes: function(value = "") {
    select("#notes").html("");
    Object.keys(localStorage)
      .map(key => {
        if (key !== "dictionary") {
          return storage.get(key);
        }
      })
      .filter(isJSON) // filter out non-notes
      .map(n => {
        const note = JSON.parse(n);
        return note;
      })
      .filter(note => {
        return note.title.toLowerCase().includes(value.toLowerCase());
      })
      .map((note, i) => {
        const li = document.createElement("LI");
        li.className = i === 0 ? "selected" : "";
        const a = document.createElement("a");
        a.href = `${window.location.origin}${window.location.pathname}#${note.title}`;
        a.appendChild(document.createTextNode(note.title));
        li.appendChild(a);
        select("#notes").append(li);
      })
      .slice(0, 10);
  },
  generateCommands: async function(value = "") {
    select("#commands").html("");
    this.commands
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
  }
};

export default commander;
