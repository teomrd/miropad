import {
  getDateCreatedFromTitle,
  getNote,
  getNotes,
} from "../noteManager/noteManager.ts";
import { commands } from "./commands.ts";
import keyListener from "../../../utils/keyListener.js";
import select from "../../../utils/dom.js";
import { url } from "../../../utils/urlManager.ts";
import { command } from "../../molecules/commands/command.js";
import { link } from "../../atoms/link/link.js";
import { div } from "../../atoms/div/div.js";
import { relativeDate } from "../../../utils/dates.js";
import { smartFilter } from "./smartFilter.ts";
import { button } from "../../atoms/button/button.js";
import { requestNotificationPermission } from "../../../registerServiceWorker.js";
import storage from "../../../utils/localstorage.js";

const getShortcut = (key: string | Array<string>): string => {
  if (Array.isArray(key)) {
    return key.map((k) => getShortcut(k)).join(", ");
  }
  return key ? `⌘+${key.toUpperCase()}` : "";
};

const commander = (() => {
  enum CommanderModes {
    off = "off",
    notes = "notes",
    revisions = "revisions",
    commands = "commands",
    gists = "gists",
  }
  let state = {
    input: "",
    mode: CommanderModes.off,
    options: {
      selected: 0,
      length: 0,
    },
  };
  return {
    getState: function () {
      return state;
    },
    getModes: function () {
      return CommanderModes;
    },
    setState: function (newState: Record<string, unknown>) {
      state = {
        ...state,
        ...newState,
      };
      return state;
    },
    show: function (what = CommanderModes.commands) {
      select("#commander").show();
      select("#commander input").focus();
      switch (what) {
        case CommanderModes.commands:
          this.generateCommands();
          select("#commander input").setValue("> ");
          this.setState({
            mode: CommanderModes.commands,
          });
          break;
        case CommanderModes.notes:
          this.generateNotes();
          select("#commander input").setValue("");
          this.setState({
            mode: CommanderModes.notes,
          });
          break;
        case CommanderModes.revisions:
          this.generateRevisions();
          select("#commander input").setValue("");
          this.setState({
            mode: CommanderModes.revisions,
          });
          break;
        default:
          // do nothing;
          break;
      }
      return this;
    },
    hide: function () {
      select("#commander").hide();
      state.mode = CommanderModes.off;
      return this;
    },
    toggle: function (mode?: CommanderModes) {
      requestNotificationPermission();
      if (state.mode === CommanderModes.off || state.mode !== mode) {
        this.show(mode);
      } else {
        this.hide();
      }
      return this;
    },
    commands: function () {
      return commands();
    },
    selectOption: function (direction: "down" | "up" = "down") {
      const currentlySelected = state.options.selected;
      const lastOption = state.options.length - 1;
      const isLastOption = currentlySelected === lastOption;
      const isFirstOption = currentlySelected === 0;
      const isDown = direction === "down";

      const indexToSelect = isDown
        ? isLastOption ? 0 : currentlySelected + 1
        : isFirstOption
        ? lastOption
        : currentlySelected - 1;

      state.options = {
        ...state.options,
        selected: indexToSelect,
      };
    },
    initCommander: function () {
      // initialize mobile-dock
      commands()
        .slice(0, 5)
        .map((command) => {
          select(".mobile-dock").append(
            button(
              // @ts-ignore js-to-ts wider refactoring required
              [command.icon, document.createTextNode(command.sortTitle)],
              command.call,
              command.title.toLowerCase().replace(/\s/g, "-"),
            ),
          );
        });

      select("#commander button").listen("click", () => {
        this.hide();
      });

      select("#commander input")
        .listen("keydown", (e: KeyboardEvent) => {
          // arrow down 40
          if (e.keyCode === 40) {
            if (state.mode === CommanderModes.revisions) {
              select("#commands li.selected").click();
            }
            this.selectOption("down");
          }
          // arrow up 38
          if (e.keyCode === 38) {
            if (state.mode === CommanderModes.revisions) {
              select("#commands li.selected").click();
            }
            this.selectOption("up");
          }
        })
        .listen("keyup", (e: KeyboardEvent) => {
          // enter
          if (e.keyCode === 13) {
            if (state.mode === CommanderModes.commands) {
              select("#commands li.selected div").click();
            } else {
              select("#commands li.selected a").click();
            }
          }
          // escape
          if (e.keyCode === 27) {
            select(".terminal").focus();
          }
          const el = e.target as HTMLTextAreaElement;
          if (state.input !== el.value) {
            state.options.selected = 0;
          }
          state.input = el.value;
          this.generateOptions(el.value);
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
      state.mode = CommanderModes.revisions;
      const note = getNote();
      if (note) {
        const { revisions } = note;
        const indexToSelect = state.options.selected;
        const revisionsOptions = Object.keys(revisions)
          .sort((a, b) => {
            const { dateCreated: aDateCreated } = revisions[a];
            const { dateCreated: bDateCreated } = revisions[b];
            return bDateCreated - aDateCreated;
          })
          .map((id, i) => ({
            title: div({ content: `...${id.slice(-10)}` }),
            secondary: `${relativeDate(revisions[id].dateCreated)}`,
            onclick: () => {
              url.set(undefined, {
                v: id,
              });
              state.options.selected = i;
              this.generateRevisions();
            },
          }))
          // @ts-ignore js-to-ts wider refactoring required
          .map((r, i) => command(r, i === indexToSelect));
        select("#commands").html(revisionsOptions);
        state.options = {
          ...state.options,
          length: revisionsOptions.length,
        };
      }

      return this;
    },
    generateOptions: function (value: string) {
      switch (state.mode) {
        case CommanderModes.commands:
        case CommanderModes.notes:
          if (value.slice(0, 1) === ">") {
            state.mode = CommanderModes.commands;
            this.generateCommands(value.slice(1).trim());
            select("#commander input").placeholder("Search for commands...");
          } else {
            state.mode = CommanderModes.notes;
            this.generateNotes(value);
          }
          return;
        case CommanderModes.revisions:
          return this.generateRevisions();
        case CommanderModes.off:
          break;
        default:
          break;
      }
    },
    generateNotes: function (value = "") {
      const indexToSelect = state.options.selected;
      const notes = getNotes()
        .filter(({ title }) => {
          return smartFilter(title, value);
        })
        .filter(({ id, deleted }) => !deleted && id !== url.getPageId())
        .sort((a, b) => {
          const aDateCreated = getDateCreatedFromTitle(a.title);
          const bDateCreated = getDateCreatedFromTitle(b.title);
          return bDateCreated - aDateCreated;
        })
        .map(({ id, title }, i) => {
          const dateCreated = getDateCreatedFromTitle(title);
          const href =
            `${globalThis.location.origin}${globalThis.location.pathname}#${id}`;

          const noteLink = link(
            div({ content: title, highlight: value }),
            href,
          );

          const noteCommand = command(
            // @ts-ignore until command.js makes it to ts
            {
              title: noteLink,
              secondary: relativeDate(dateCreated),
              onclick: () => {
                this.hide();
                select(".terminal").focus();
              },
            },
            i === indexToSelect,
          );
          return noteCommand;
        });
      select("#commands").html(notes);
      select("#commander input").placeholder(
        `Search from ${notes.length} saved notes...`,
      );
      state.options = {
        ...state.options,
        length: notes.length,
      };
      return this;
    },
    generateCommands: function (value = "") {
      const indexToSelect = state.options.selected;
      const commandComponents = this.commands()
        .filter(({ title }) => smartFilter(title, value))
        // @ts-ignore js-to-ts wider refactoring required
        .filter(({ experimental = false }) => {
          return storage.get("__experimental__") ? true : !experimental;
        })
        // @ts-ignore js-to-ts wider refactoring required
        .map(({ title, key, call, icon }, i) => {
          const commandComponent = command(
            // @ts-ignore until command.js makes it to ts
            {
              title: div({ content: title, highlight: value }),
              icon: icon,
              secondary: getShortcut(key),
              onclick: call,
            },
            i === indexToSelect,
          );
          return commandComponent;
        });
      select("#commands").html(commandComponents);
      state.options = {
        ...state.options,
        length: commandComponents.length,
      };
      return this;
    },
  };
})();

export default commander;
