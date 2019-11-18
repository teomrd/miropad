/* eslint-disable indent */
import toggleMarkDownViewer, { markDownIt } from "../../toggleMarkDownViewer";
import prettifyJSON from "../../utils/prettifyJSON";
import { mailTo } from "../../utils/mail";
import keyListener from "../../utils/keyListener";
import select from "../../utils/dom";
import storage from "../../utils/localstorage";
import isJSON from "../../utils/isJSON";
import {
  getCurrentNote,
  resetNoteManager,
  saveNote
} from "../noteManager/noteManager";

const commanderModes = {
  off: "off",
  notes: "notes",
  commands: "commands"
};

const commander = {
  state: {
    mode: commanderModes.off
  },
  show: function(what = commanderModes.commands) {
    select("#commander").show();
    select("#commander input").focus();
    switch (what) {
      case commanderModes.commands:
        this.generateCommands();
        select("#commander input").setValue("> ");
        this.state.mode = commanderModes.commands;
        break;
      case commanderModes.notes:
        this.generateNotes();
        select("#commander input").setValue("");
        this.state.mode = commanderModes.notes;
        break;
      default:
        // do nothing;
        break;
    }
    return this;
  },
  hide: function() {
    select("#commander").hide();
    this.state.mode = commanderModes.off;
    return this;
  },
  toggle: function() {
    if (this.state.mode === commanderModes.off) {
      this.show();
    } else {
      this.hide();
    }
    return this;
  },
  commands: function() {
    return [
      {
        title: "📒 List saved notes",
        key: "p",
        call: () => {
          this.state.mode !== commanderModes.notes
            ? this.show(commanderModes.notes)
            : this.hide();
        }
      },
      {
        title: "💾 Save",
        key: "s",
        call: () => {
          saveNote(select(".terminal").getValue());
          this.hide();
          select(".logo").removeClass("unsaved");
        }
      },
      {
        title: "🗑 Trash note",
        key: "shift d",
        call: () => {
          const confirmation = confirm("Are you sure you want do that?");
          if (confirmation) {
            const note = getCurrentNote();
            if (note && note.id) {
              localStorage.removeItem(note.id);
            }
            resetNoteManager();
          }
          this.hide();
        }
      },
      {
        title: "📡 Save to IPFS",
        key: "i",
        call: () => {
          storage.saveToIPFS(select(".terminal").getValue());
          this.hide();
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
          this.hide();
        }
      },
      {
        title: "🖨 Print MarkDown output",
        key: null,
        call: () => {
          select(".preview").show();
          markDownIt();
          window.print();
          this.hide();
        }
      },
      {
        title: "🔳 Toggle MarkDown Viewer",
        key: "m",
        call: () => {
          toggleMarkDownViewer();
          this.hide();
        }
      },
      {
        key: "j",
        title: "💄 Prettify JSON document",
        call: () => {
          prettifyJSON(".terminal");
          this.hide();
        }
      },
      {
        title: "🎨 Toggle command palette",
        key: "shift p",
        call: () => {
          this.state.mode !== commanderModes.commands
            ? this.show(commanderModes.commands)
            : this.hide();
        }
      }
    ];
  },
  initCommander: function() {
    select("#commander input").listen("keyup", e => {
      if (e.target.value.slice(0, 1) === ">") {
        this.state.mode = commanderModes.commands;
        this.generateCommands(e.target.value.slice(1, -1).trim());
        select("#commander input").placeholder("Search for commands...");
      } else {
        this.state.mode = commanderModes.notes;
        this.generateNotes(e.target.value);
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
    keyListener.listen().on(this.commands());
    select(".menu").listen("click", () => this.toggle());
    return this;
  },
  generateNotes: function(value = "") {
    select("#commands").html("");
    Object.entries(localStorage)
      .reduce((acc, current) => {
        const noteId = current[0];
        const noteBody = isJSON(current[1]) ? JSON.parse(current[1]) : {};
        const hasTitle = Object.prototype.hasOwnProperty.call(
          noteBody,
          "title"
        );
        return [
          ...acc,
          ...(hasTitle
            ? [
                {
                  id: noteId,
                  ...noteBody
                }
              ]
            : [])
        ];
      }, [])
      .filter(({ title }) => {
        return title.toLowerCase().includes(value.toLowerCase());
      })
      .sort((a, b) => {
        const aDateCreated = Object.values(a.revisions)[0].dateCreated;
        const bDateCreated = Object.values(b.revisions)[0].dateCreated;
        return bDateCreated - aDateCreated;
      })
      .map(({ id, title, revisions }, i) => {
        const li = document.createElement("LI");
        const dateSpan = document.createElement("span");
        dateSpan.className = "secondary";
        const dateCreated = new Date(Object.values(revisions)[0].dateCreated);
        dateSpan.appendChild(
          document.createTextNode(
            `${new Date(dateCreated).toLocaleDateString()} ${new Date(
              dateCreated
            ).toLocaleTimeString()}`
          )
        );
        li.className = i === 0 ? "selected" : "";
        li.onclick = () => this.hide();
        const a = document.createElement("a");
        a.href = `${window.location.origin}${window.location.pathname}#${id}`;
        a.appendChild(document.createTextNode(title));
        li.appendChild(a);
        li.appendChild(dateSpan);
        select("#commands").append(li);
      })
      .slice(0, 10);
    return this;
  },
  generateCommands: async function(value = "") {
    select("#commands").html("");
    this.commands()
      .filter(({ title }) => title.toLowerCase().includes(value.toLowerCase()))
      .map(({ title, key, call }, i) => {
        const li = document.createElement("LI");
        li.className = i === 0 ? "selected" : "";
        li.onclick = call;
        const commandContainer = document.createElement("div");
        commandContainer.appendChild(document.createTextNode(title));
        li.appendChild(commandContainer);
        const span = document.createElement("span");
        span.className = "secondary";
        if (key) {
          span.appendChild(document.createTextNode(`⌘+${key.toUpperCase()}`));
        }
        li.appendChild(span);
        select("#commands").append(li);
      });
    return this;
  }
};

export default commander;
