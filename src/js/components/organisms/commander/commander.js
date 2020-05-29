/* eslint-disable indent */
import {
  getNote,
  getNotes,
  getDateCreatedFromTitle,
} from "../noteManager/noteManager";
import { commands } from "./commands";
import keyListener from "../../../utils/keyListener";
import select from "../../../utils/dom";
import { url } from "../../../utils/urlManager";
import { command } from "../../molecules/commands/command";
import { link } from "../../atoms/link/link";
import { div } from "../../atoms/div/div";
import { relativeDate } from "../../../utils/dates";
import { smartFilter } from "./smartFilter";
import { button } from "../../atoms/button/button";

const commander = (() => {
  const commanderModes = {
    off: "off",
    notes: "notes",
    revisions: "revisions",
    commands: "commands",
    gists: "gists",
  };
  let state = {
    input: "",
    mode: commanderModes.off,
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
      return commanderModes;
    },
    setState: function (newState) {
      state = {
        ...state,
        ...newState,
      };
      return state;
    },
    show: function (what = commanderModes.commands) {
      select("#commander").show();
      select("#commander input").focus();
      switch (what) {
        case commanderModes.commands:
          this.generateCommands();
          select("#commander input").setValue("> ");
          this.setState({
            mode: commanderModes.commands,
          });
          break;
        case commanderModes.notes:
          this.generateNotes();
          select("#commander input").setValue("");
          this.setState({
            mode: commanderModes.notes,
          });
          break;
        case commanderModes.revisions:
          this.generateRevisions();
          select("#commander input").setValue("");
          this.setState({
            mode: commanderModes.revisions,
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
      state.mode = commanderModes.off;
      return this;
    },
    toggle: function (mode) {
      if (state.mode === commanderModes.off || state.mode !== mode) {
        this.show(mode);
      } else {
        this.hide();
      }
      return this;
    },
    commands: function () {
      return commands;
    },
    selectOption: function (e, direction) {
      const currentlySelected = state.options.selected;
      const lastOption = state.options.length - 1;
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

      state.options = {
        ...state.options,
        selected: indexToSelect,
      };
    },
    initCommander: function () {
      // initialize mobile-dock
      commands.slice(0, 5).map((command) => {
        select(".mobile-dock").append(
          button(
            [command.icon, document.createTextNode(command.sortTitle)],
            command.call
          )
        );
      });

      select("#commander button").listen("click", () => {
        this.hide();
      });

      select("#commander input")
        .listen("keydown", (e) => {
          // arrow down 40
          if (e.keyCode === 40) {
            if (state.mode === commanderModes.revisions) {
              select("#commands li.selected").click();
            }
            this.selectOption(e, "down");
          }
          // arrow up 38
          if (e.keyCode === 38) {
            if (state.mode === commanderModes.revisions) {
              select("#commands li.selected").click();
            }
            this.selectOption(e, "up");
          }
        })
        .listen("keyup", (e) => {
          // enter
          if (e.keyCode === 13) {
            if (state.mode === commanderModes.commands) {
              select("#commands li.selected").click();
            } else {
              select("#commands li.selected a").click();
            }
          }
          // escape
          if (e.keyCode === 27) {
            select(".terminal").focus();
          }
          if (state.input !== e.target.value) {
            state.options.selected = 0;
          }
          state.input = e.target.value;
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
      state.mode = commanderModes.revisions;
      const { revisions } = getNote();
      const indexToSelect = state.options.selected;
      const revisionsOptions = Object.keys(revisions)
        .map((id, i) => ({
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
            state.options.selected = i;
            this.generateRevisions();
          },
        }))
        .map((r, i) => command(r, i === indexToSelect));

      select("#commands").html(revisionsOptions);

      state.options = {
        ...state.options,
        length: revisionsOptions.length,
      };
      return this;
    },
    generateOptions: function (value) {
      switch (state.mode) {
        case commanderModes.commands:
        case commanderModes.notes:
          if (value.slice(0, 1) === ">") {
            state.mode = commanderModes.commands;
            this.generateCommands(value.slice(1).trim());
            select("#commander input").placeholder("Search for commands...");
          } else {
            state.mode = commanderModes.notes;
            this.generateNotes(value);
          }
          return;
        case commanderModes.revisions:
          return this.generateRevisions();
        case commanderModes.off:
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
        .filter(({ deleted }) => !deleted)
        .sort((a, b) => {
          const aDateCreated = getDateCreatedFromTitle(a.title);
          const bDateCreated = getDateCreatedFromTitle(b.title);
          return bDateCreated - aDateCreated;
        })
        .map(({ id, title, cid }, i) => {
          const dateCreated = getDateCreatedFromTitle(title);
          const linkParams = cid ? `?cid=${cid}` : "";
          const href = `${window.location.origin}${window.location.pathname}#${id}${linkParams}`;

          const noteLink = link(
            div({ content: title, highlight: value }),
            href
          );

          const noteCommand = command(
            {
              title: noteLink,
              secondary: relativeDate(dateCreated),
              onclick: () => this.hide(),
            },
            i === indexToSelect
          );
          return noteCommand;
        });
      select("#commands").html(notes);
      select("#commander input").placeholder(
        `Search from ${notes.length} saved notes...`
      );
      state.options = {
        ...state.options,
        length: notes.length,
      };
      return this;
    },
    generateCommands: async function (value = "") {
      const indexToSelect = state.options.selected;
      const commandComponents = this.commands()
        .filter(({ title }) => smartFilter(title, value))
        .map(({ title, key, call, icon }, i) => {
          const keyCompo = key ? `⌘+${key.toUpperCase()}` : "";
          const commandComponent = command(
            {
              title: div({ content: title, highlight: value }),
              icon: icon,
              secondary: keyCompo,
              onclick: call,
            },
            i === indexToSelect
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
