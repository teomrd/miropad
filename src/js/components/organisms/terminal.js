import getCaretCoordinates from "textarea-caret";
import storage from "../../utils/localstorage";
import select from "../../utils/dom";
import commander from "./commander/commander";
import { getNote } from "./noteManager/noteManager";
import { div } from "../atoms/div/div";
import { command } from "../molecules/commands/command";

const isLastCharacterInTheWord = (text, characterIndex) =>
  text[characterIndex] === undefined || text[characterIndex].trim() === "";

const placeSuggestion = (textEl) => {
  const coords = getCaretCoordinates(textEl, textEl.selectionEnd);
  const { top, left } = coords;
  select(".suggestion").el.style.top = `${top}px`;
  select(".suggestion").el.style.left = `${left}px`;
};

const getCurrentlyTypingWord = (text, cursorIndexPosition) => {
  let word = "";
  let currentIndex = cursorIndexPosition - 1;
  do {
    const character = text[currentIndex] || "";
    currentIndex = character.trim() === "" ? -1 : currentIndex - 1;
    word = character.trim() !== "" ? `${character}${word}` : word;
  } while (currentIndex >= 0);
  return word;
};

const getPredictions = (word) => {
  const sanitizedWord = word.replace(/[\r\n\t]+/g, "").toLowerCase();
  const dictionary = storage.getDictionary();

  return dictionary.filter((word) => word.startsWith(sanitizedWord));
};

const acceptCompletion = () => {
  const prediction = storage.get("__prediction__");
  const word = storage.get("__word__");
  const completion = prediction.replace(word.toLowerCase(), "");
  if (completion) {
    select(".terminal").insertAtCaret(`${completion} `);
  } else {
    select(".terminal").insertAtCaret("  ");
  }
  select(".suggestion").hide();
  storage.set("__prediction__", "");
};

export const terminal = (() => {
  const initState = {
    matches: [],
    options: {
      selected: 0,
      length: 0,
    },
  };
  let state = initState;
  return {
    el: select(".terminal"),
    setState: function (newState) {
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
        : isFirstOption
          ? lastOption
          : currentlySelected - 1;

      state.options = {
        ...state.options,
        selected: indexToSelect,
      };
      terminal.renderOptions();
    },
    renderOptions: () => {
      const optionsUl = select(".suggestion .options");
      if (optionsUl && optionsUl.el) optionsUl.el.remove();

      const selectedIndex = state.options.selected;
      const options = state.matches.map((word, i) =>
        command(
          {
            title: div({ content: word }),
            onclick: (e) => {
              console.log("Hello there", e);
            },
          },
          i === selectedIndex
        )
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
      const cursorIndexPosition = e.target.selectionEnd;
      const fullText = terminal.el.getValue();

      const charTyped = fullText[cursorIndexPosition - 1];
      if (e.inputType === "deleteContentBackward" || charTyped === " ") {
        storage.set("__prediction__", "");
        select(".suggestion").hide();
      }

      if (
        e.inputType === "insertText" &&
        isLastCharacterInTheWord(fullText, cursorIndexPosition)
      ) {
        placeSuggestion(e.target);
        const word = getCurrentlyTypingWord(fullText, cursorIndexPosition);
        const matches = getPredictions(word);

        const [firstMatch] = matches;
        const prediction = firstMatch || "";

        terminal.setState({
          matches,
          options: {
            selected: 0,
            length: matches.length,
          },
        });

        storage.set("__prediction__", prediction);
        storage.set("__word__", word);

        const inlineSuggestion = div({
          content: `${prediction.slice(word.length)}`,
        });
        inlineSuggestion.setAttribute("id", "inlineSuggestion");
        select(".suggestion").show().html(inlineSuggestion);

        terminal.renderOptions();
      }
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
    onTab: (e) => {
      e.preventDefault();
      terminal.resetState();
      acceptCompletion();
    },
    onKeyDown: (e) => {
      // console.log({ code: e.keyCode });
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
        storage.set("__prediction__", "");
      }
    },
    onKeyUp: () => {
      console.log({ state });
      const currentNote = getNote();
      const { text = "" } = currentNote || {};
      const isNoteUnSaved = terminal.el.getValue() !== text;
      // unsaved state UI indication
      if (currentNote) {
        if (isNoteUnSaved) {
          select("#save").addClass("unsaved");
        } else {
          select("#save").removeClass("unsaved");
        }
      }
    },
    init: function () {
      select(".suggestion").listen("click", acceptCompletion);
      this.el
        .listen("focus", this.onFocus)
        .listen("input", this.onInput)
        .listen("keydown", this.onKeyDown)
        .listen("keyup", this.onKeyUp);
    },
  };
})();
