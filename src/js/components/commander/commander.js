/* eslint-disable indent */
import toggleMarkDownViewer, { markDownIt } from "../../toggleMarkDownViewer";
import prettifyJSON from "../../utils/prettifyJSON";
import { mailTo } from "../../utils/mail";
import keyListener from "../../utils/keyListener";
import select from "../../utils/dom";
import storage from "../../utils/localstorage";
import {
  getNote,
  resetNoteManager,
  saveNote,
  getNotes,
} from "../noteManager/noteManager";
import { url } from "../../utils/urlManager";
import { saveFileAs } from "../fileSystem/fileSystem";
import { commands } from "./commands";
import {
  goAuthenticate,
  setGistToSyncWith,
  syncNotesWithGitHub,
} from "../../utils/github";

export const commanderModes = {
  off: "off",
  notes: "notes",
  revisions: "revisions",
  commands: "commands",
  gists: "gists",
};

const commander = {
  state: {
    input: "",
    mode: commanderModes.off,
    options: {
      selected: 0,
      length: 0,
    },
  },
  show: function (what = commanderModes.commands) {
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
      case commanderModes.revisions:
        this.generateRevisions();
        select("#commander input").setValue("");
        this.state.mode = commanderModes.revisions;
        break;
      default:
        // do nothing;
        break;
    }
    return this;
  },
  hide: function () {
    select("#commander").hide();
    this.state.mode = commanderModes.off;
    return this;
  },
  toggle: function () {
    if (this.state.mode === commanderModes.off) {
      this.show();
    } else {
      this.hide();
    }
    return this;
  },
  commands: function () {
    return [
      {
        title: "📒 List saved notes",
        key: "p",
        call: () => {
          this.state.mode !== commanderModes.notes
            ? this.show(commanderModes.notes)
            : this.hide();
        },
      },
      {
        title: "💾 Save",
        key: "s",
        call: () => {
          saveNote(select(".terminal").getValue());
          this.hide();
          select(".logo").removeClass("unsaved");
        },
      },
      {
        title: "🔄 Sync: Notes my GitHub Gist (requires auth)",
        key: null,
        call: async () => {
          const token = storage.get("authToken");
          if (!token) {
            return await goAuthenticate();
          }
          const gistId = storage.get("gistId");
          if (!gistId) {
            return await setGistToSyncWith(token);
          }
          this.hide();
          await syncNotesWithGitHub();
        },
      },
      {
        title: "💾 Save to File System (Experimental browser feature)...",
        key: "shift s",
        call: async () => {
          const { text, title } = getNote();
          await navigator.clipboard.writeText(title);
          saveFileAs(text);
          this.hide();
        },
      },
      {
        title: "🗑 Trash note",
        key: "shift d",
        call: () => {
          const confirmation = confirm("Are you sure you want do that?");
          if (confirmation) {
            const note = getNote();
            if (note && note.id) {
              localStorage.removeItem(note.id);
            }
            resetNoteManager();
          }
          this.hide();
        },
      },
      {
        title: "📡 Save to IPFS",
        key: "i",
        call: () => {
          storage.saveToIPFS(select(".terminal").getValue());
          this.hide();
        },
      },
      {
        title: "📬 Email note to...",
        key: "e",
        call: () => {
          const note = `${
            document.querySelector(".terminal").value
          } \n ${url.get()}`;
          mailTo(note);
          this.hide();
        },
      },
      {
        title: "🖨 Print MarkDown output",
        key: null,
        call: () => {
          select(".preview").show();
          markDownIt();
          window.print();
          this.hide();
        },
      },
      {
        title: "◽ Full MarkDown view",
        key: "shift m",
        call: () => {
          markDownIt();
          url.set(undefined, {
            md: "full",
          });
          this.hide();
        },
      },
      {
        title: "🔳 Toggle MarkDown Viewer",
        key: "m",
        call: () => {
          toggleMarkDownViewer();
          this.hide();
        },
      },
      {
        key: "j",
        title: "💄 Prettify JSON document",
        call: () => {
          prettifyJSON(".terminal");
          this.hide();
        },
      },
      {
        title: "🎨 Toggle command palette",
        key: "shift p",
        call: () => {
          this.state.mode !== commanderModes.commands
            ? this.show(commanderModes.commands)
            : this.hide();
        },
      },
      {
        title: " 🕵️‍♂️ Find and Replace...",
        key: "shift f",
        call: () => {
          const selectedValue = select(".terminal")
            .getValue()
            .slice(
              select(".terminal").el.selectionStart,
              select(".terminal").el.selectionEnd
            );
          const valueToFind = prompt("What do you wanna find?", selectedValue);
          if (!valueToFind) {
            return this;
          }
          const positionOfFirstChar = select(".terminal")
            .getValue()
            .indexOf(valueToFind);

          select(".terminal").el.setSelectionRange(
            positionOfFirstChar,
            positionOfFirstChar + valueToFind.length
          );
          const replacementValue = prompt(`Replace ${valueToFind} with...`);
          if (replacementValue) {
            select(".terminal").el.setRangeText(replacementValue);
          }
        },
      },
    ];
  },
  selectOption: function (e, direction) {
    const currentlySelected = this.state.options.selected;
    const lastOption = this.state.options.length - 1;
    const isLastOption = currentlySelected === lastOption;
    const isFirstOption = currentlySelected === 0;
    const isDown = direction === "down";

    const indexToSelect = isDown
      ? isLastOption
        ? 0
        : currentlySelected + 1
      : isFirstOption
      ? lastOption
      : currentlySelected - 1;

    this.state.options = {
      ...this.state.options,
      selected: indexToSelect,
    };
  },
  initCommander: function () {
    select("#commander input")
      .listen("keydown", (e) => {
        // arrow down 40
        if (e.keyCode === 40) {
          if (this.state.mode === commanderModes.revisions) {
            select("#commands li.selected").click();
          }
          this.selectOption(e, "down");
        }
        // arrow up 38
        if (e.keyCode === 38) {
          if (this.state.mode === commanderModes.revisions) {
            select("#commands li.selected").click();
          }
          this.selectOption(e, "up");
        }
      })
      .listen("keyup", (e) => {
        // enter
        if (e.keyCode === 13) {
          if (this.state.mode === commanderModes.commands) {
            select("#commands li.selected").click();
          } else {
            select("#commands li.selected a").click();
          }
        }
        // escape
        if (e.keyCode === 27) {
          select(".terminal").focus();
        }
        if (this.state.input !== e.target.value) {
          this.state.options.selected = 0;
        }
        this.state.input = e.target.value;
        this.generateOptions(e.target.value);
      });
    return this;
  },
  init: function () {
    this.initCommander();
    keyListener.listen().on(this.commands());
    select(".menu").listen("click", () => this.toggle());
    select("#revisions").listen("click", () => this.generateRevisions());
    return this;
  },
  generateRevisions: function () {
    this.show();
    this.state.mode = commanderModes.revisions;
    const { revisions } = getNote();

    select("#commands").html("");
    const revisionsOptions = Object.keys(revisions).map((id, i) => ({
      title: i + 1,
      secondary: `${new Date(
        revisions[id].dateCreated
      ).toLocaleDateString()} ${new Date(
        revisions[id].dateCreated
      ).toLocaleTimeString()}`,
      onclick: () => {
        url.set(undefined, {
          v: id,
        });
        this.state.options.selected = i;
        this.generateRevisions();
      },
    }));

    commands(revisionsOptions, this.state.options.selected).map((el) =>
      select("#commands").append(el)
    );

    this.state.options = {
      ...this.state.options,
      length: revisionsOptions.length,
    };
    return this;
  },
  generateOptions: function (value) {
    if (this.state.mode !== commanderModes.revisions) {
      if (value.slice(0, 1) === ">") {
        this.state.mode = commanderModes.commands;
        this.generateCommands(value.slice(1, -1).trim());
        select("#commander input").placeholder("Search for commands...");
      } else {
        this.state.mode = commanderModes.notes;
        this.generateNotes(value);
        select("#commander input").placeholder("Search for saved notes...");
      }
    } else {
      this.generateRevisions();
    }
  },
  generateNotes: function (value = "") {
    const indexToSelect = this.state.options.selected;
    select("#commands").html("");
    const notes = getNotes()
      .filter(({ title }) => {
        return title.toLowerCase().includes(value.toLowerCase());
      })
      .sort((a, b) => {
        const aDateCreated = Object.values(a.revisions)[0].dateCreated;
        const bDateCreated = Object.values(b.revisions)[0].dateCreated;
        return bDateCreated - aDateCreated;
      })
      .slice(0, 100)
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
        li.className = i === indexToSelect ? "selected" : "";
        li.onclick = () => this.hide();
        const a = document.createElement("a");
        a.href = `${window.location.origin}${window.location.pathname}#${id}`;
        a.appendChild(document.createTextNode(title));
        li.appendChild(a);
        li.appendChild(dateSpan);
        select("#commands").append(li);
      });
    this.state.options = {
      ...this.state.options,
      length: notes.length,
    };
    return this;
  },
  generateCommands: async function (value = "") {
    const indexToSelect = this.state.options.selected;
    select("#commands").html("");
    const commands = this.commands()
      .filter(({ title }) => title.toLowerCase().includes(value.toLowerCase()))
      .map(({ title, key, call }, i) => {
        const li = document.createElement("LI");
        li.className = i === indexToSelect ? "selected" : "";
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
    this.state.options = {
      ...this.state.options,
      length: commands.length,
    };
    return this;
  },
};

export default commander;
