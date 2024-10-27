import { nanoid } from "nanoid";
import TrashSVG from "../../../assets/svg/trash.svg";
import { configuration } from "../../../configuration.ts";
import { autoComplete } from "../../features/autoComplete";
import { setSavedState } from "../../ui/functions/savedState.ts";
import select from "../../utils/dom.js";
import storage from "../../utils/localstorage.js";
import { handleErrorResponse } from "../../utils/mail";
import { autoCompleteCheckboxes } from "../../utils/text/autoCompleteCheckboxes";
import { div } from "../atoms/div/div";
import { icon } from "../atoms/icon/icon";
import { command } from "../molecules/commands/command.js"
import notify from "../molecules/notify.js";
import commander from "./commander/commander";
import markDownViewer from "./markdown/markDownViewer";
import { getNote, getTitle } from "./noteManager/noteManager";
import { trieDictionary } from "../../main";
import { renderInterNotes } from "../../features/inter-linking/renderInterNotes";

type TerminalState = {
  matches: Array<string>;
  currentWord: null | string;
  prediction: null | string;
  options: {
    selected: number;
    length: number;
  };
};

export const terminal = (() => {
  const initState = {
    matches: [],
    currentWord: null,
    prediction: null,
    options: {
      selected: 0,
      length: 0,
    },
  } as TerminalState;
  let state = initState;
  return {
    el: select(".terminal"),
    getState: function (): TerminalState {
      return state;
    },
    setState: function (newState: Partial<TerminalState>) {
      state = {
        ...state,
        ...newState,
      };
      return state;
    },
    resetState: function () {
      terminal.setState(initState);
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
        : // eslint-disable-next-line prettier/prettier
        : isFirstOption
          ? lastOption
          : currentlySelected - 1;

      state.options = {
        ...state.options,
        selected: indexToSelect,
      };

      terminal.setState({
        prediction: state.matches[state.options.selected],
      });
      terminal.renderInlineSuggestion();
      terminal.renderOptions();
    },
    acceptCompletion: (word?: string) => {
      const complete = (word: string, currentWord: string) => {
        const completion = word
          .toLowerCase()
          .replace(currentWord.toLowerCase(), "");
        if (completion) {
          select(".terminal").insertAtCaret(`${completion} `);
        } else {
          select(".terminal").insertAtCaret("  ");
        }
        select(".suggestion").hide();
        terminal.resetState();
      };

      const { prediction, currentWord } = state;

      if (word) {
        return complete(word, currentWord);
      }

      if (prediction) {
        complete(prediction, currentWord);
        // +1 to the score of the word autocompleted
        trieDictionary.insert(prediction);
      }
    },
    renderInlineSuggestion: () => {
      const { prediction, currentWord } = state;
      if (prediction && currentWord) {
        const inlineSuggestion = div({
          content: `${prediction.slice(currentWord.length)}`,
        });
        inlineSuggestion.setAttribute("id", "inlineSuggestion");
        select(".suggestion").show().html(inlineSuggestion);
      }
    },
    renderOptions: () => {
      const optionsUl = select(".suggestion .options");
      if (optionsUl && optionsUl.el) optionsUl.el.remove();

      const selectedIndex = state.options.selected;
      const options = state.matches.map((word, i) =>
        command(
          {
            title: div({ content: word }),
            secondary: icon(TrashSVG, "delete word"),
            onSecondaryClick: () => {
              storage.removeFromDictionary(word);
              terminal.setState({
                matches: state.matches.filter((m) => m !== word),
              });
              terminal.renderOptions();
            },
            onclick: () => {
              terminal.acceptCompletion(word);
            },
          },
          i === selectedIndex,
        ),
      );
      const optionList = document.createElement("ul");
      optionList.classList.add("options");
      optionList.classList.add("frost");
      options.forEach((el) => optionList.append(el));

      select(".suggestion").el.append(optionList);
    },
    onFocus: () => {
      commander.hide();
      select(".note-info").hide();
    },
    onInput: (e) => {
      const isAutocompleteEnabled = !!storage.get("__autocomplete__");
      if (isAutocompleteEnabled) {
        autoComplete(e);
      }
      renderInterNotes(e);
    },
    onArrowDown: (e) => {
      if (state.matches.length > 0) {
        e.preventDefault();
        terminal.selectOption(e, "down");
      }
    },
    onArrowUp: (e) => {
      if (state.matches.length > 0) {
        e.preventDefault();
        terminal.selectOption(e, "up");
      }
    },
    setValue: () => {
      // terminal.el.value = "mpampis";
    },
    onEnter: (e) => {
      if (state.matches.length > 0) {
        e.preventDefault();
        terminal.acceptCompletion();
      }

      // auto-magically handle checkboxes
      autoCompleteCheckboxes(e);
    },
    onEscape: () => {
      terminal.resetState();
      select(".suggestion").hide();
    },
    onTab: (e) => {
      e.preventDefault();
      terminal.acceptCompletion();
    },
    onKeyDown: (e) => {
      // enter
      if (e.keyCode === 13) {
        terminal.onEnter(e);
      }
      // arrow down
      if (e.keyCode === 40) {
        terminal.onArrowDown(e);
      }

      // arrow up
      if (e.keyCode === 38) {
        terminal.onArrowUp(e);
      }

      if (e.keyCode === 9) {
        terminal.onTab(e);
      }

      if (e.keyCode === 32) {
        terminal.setState({
          prediction: "",
        });
      }

      // escape
      if (e.keyCode === 27) {
        terminal.onEscape(e);
      }
    },
    onKeyUp: (e) => {
      const currentlySavedNote = getNote();
      const title = getTitle(e.target.value);
      select(".title h3").html(title);

      const { text = "" } = currentlySavedNote || {};
      const isNoteSaved = currentlySavedNote && terminal.el.getValue() === text;
      setSavedState(isNoteSaved);
    },
    onPaste: async () => {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types?.filter((type) =>
          type.startsWith("image/")
        );
        for (const imageType of imageTypes) {
          const blob = await clipboardItem.getType(imageType);
          const token = storage.get("MIROPAD_SECRET_TOKEN");
          if (token) {
            const [image, fileExtension] = imageType.split("/");
            const fileName = `${nanoid()}.${fileExtension}`;

            select("#logo").addClass("loading");
            try {
              const { url } = await fetch(
                `${configuration.file_service.api}?fileName=${fileName}`,
                {
                  method: "POST",
                  headers: {
                    "x-secret-token": token,
                    accept: "application/json",
                    "content-type": "application/octet-stream",
                  },
                  body: blob,
                },
              )
                .then(handleErrorResponse)
                .then((response) => response.json());
              select(".terminal").insertAtCaret(`![image](${url})`);
            } catch (error) {
              notify.error(`Uploading file failed 💥! Error$ ${error.message}`);
            }
            select("#logo").removeClass("loading");
          } else {
            const imageURI = URL.createObjectURL(blob);
            select(".terminal").insertAtCaret(`![image](${imageURI})`);
          }
          markDownViewer.update();
        }
      }
    },
    init: function () {
      this.el
        .listen("focus", this.onFocus)
        .listen("input", this.onInput)
        .listen("keydown", this.onKeyDown)
        .listen("keyup", this.onKeyUp)
        .listen("paste", this.onPaste);
    },
  };
})();
