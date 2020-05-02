/* eslint-disable indent */
import {
  getNote,
  getNotes,
  getDateCreatedFromTitle,
} from "../noteManager/noteManager";
import { commands } from "./commands";
import { commanderModes } from "./modes";
import keyListener from "../../../utils/keyListener";
import select from "../../../utils/dom";
import { url } from "../../../utils/urlManager";
import { command } from "../../molecules/commands/command";
import { link } from "../../atoms/link/link";
import { div } from "../../atoms/div/div";
import { relativeDate } from "../../../utils/dates";
import { smartFilter } from "./smartFilter";

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
    return commands;
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
    select("#commander button").listen("click", () => {
      this.hide();
    });

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
    const indexToSelect = this.state.options.selected;
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
          this.state.options.selected = i;
          this.generateRevisions();
        },
      }))
      .map((r, i) => command(r, i === indexToSelect));

    select("#commands").html(revisionsOptions);

    this.state.options = {
      ...this.state.options,
      length: revisionsOptions.length,
    };
    return this;
  },
  generateOptions: function (value) {
    switch (this.state.mode) {
      case commanderModes.commands:
      case commanderModes.notes:
        if (value.slice(0, 1) === ">") {
          this.state.mode = commanderModes.commands;
          this.generateCommands(value.slice(1).trim());
          select("#commander input").placeholder("Search for commands...");
        } else {
          this.state.mode = commanderModes.notes;
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
    const indexToSelect = this.state.options.selected;
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
      .map(({ id, title }, i) => {
        const dateCreated = getDateCreatedFromTitle(title);
        const noteLink = link(
          div({ content: title, highlight: value }),
          `${window.location.origin}${window.location.pathname}#${id}`
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
    this.state.options = {
      ...this.state.options,
      length: notes.length,
    };
    return this;
  },
  generateCommands: async function (value = "") {
    const indexToSelect = this.state.options.selected;
    const commandComponents = this.commands()
      .filter(({ title }) => smartFilter(title, value))
      .map(({ title, key, call }, i) => {
        const keyCompo = key ? `⌘+${key.toUpperCase()}` : "";
        const commandComponent = command(
          {
            title: div({ content: title, highlight: value }),
            secondary: keyCompo,
            onclick: call,
          },
          i === indexToSelect
        );
        return commandComponent;
      });
    select("#commands").html(commandComponents);
    this.state.options = {
      ...this.state.options,
      length: commandComponents.length,
    };
    return this;
  },
};

export default commander;
