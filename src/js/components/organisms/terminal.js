import getCaretCoordinates from "textarea-caret";
import storage from "../../utils/localstorage";
import select from "../../utils/dom";
import commander from "./commander/commander";
import { getNote, getTitle } from "./noteManager/noteManager";
import { div } from "../atoms/div/div";
import { command } from "../molecules/commands/command";
import { icon } from "../atoms/icon/icon";
import TrashSVG from "../../../assets/svg/trash.svg";
import { trieDictionary } from "../../main";
import { setSavedState } from "../../ui/functions/savedState";
import { autoCompleteCheckboxes } from "../../utils/text/autoCompleteCheckboxes";
import markDownViewer from "./markdown/markDownViewer";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { configuration } from "../../../configuration";
import { nanoid } from 'nanoid';
import { handleErrorResponse } from "../../utils/mail";

const isLastCharacterInTheWord = (text, characterIndex) =>
  text[characterIndex] === undefined || text[characterIndex].trim() === "";

const placeSuggestion = (textEl) => {
  const coords = getCaretCoordinates(textEl, textEl.selectionEnd);
  const { top, left } = coords;

  // This does the trick! `main` is getting the same
  // height as the textarea so the suggestion will be placed
  // right!
  // TODO: change that on terminal size change!
  const actualTerminalHeight = select(".terminal").el.scrollHeight;
  const main = select("main").el;
  main.style.height = `${actualTerminalHeight}px`;

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

  return trieDictionary.getMatchingWords(sanitizedWord);
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
        : // eslint-disable-next-line prettier/prettier
        isFirstOption ? lastOption : currentlySelected - 1;

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
    acceptCompletion: (word) => {
      const complete = (word, currentWord) => {
        const completion = word.replace(currentWord.toLowerCase(), "");
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

      const inlineSuggestion = div({
        content: `${prediction.slice(currentWord.length)}`,
      });
      inlineSuggestion.setAttribute("id", "inlineSuggestion");
      select(".suggestion").show().html(inlineSuggestion);
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
      const isAutocompleteEnabled = !!storage.get("__autocomplete__");
      if (!isAutocompleteEnabled) return;

      const cursorIndexPosition = e.target.selectionEnd;
      const fullText = terminal.el.getValue();

      const charTyped = fullText[cursorIndexPosition - 1];
      if (e.inputType === "deleteContentBackward" || charTyped === " ") {
        terminal.setState({
          prediction: initState.prediction,
          currentWord: initState.currentWord,
        });
        return select(".suggestion").hide();
      }

      const shouldDisplaySuggestion =
        e.inputType === "insertText" &&
        isLastCharacterInTheWord(fullText, cursorIndexPosition);

      if (shouldDisplaySuggestion) {
        placeSuggestion(e.target);
        const word = getCurrentlyTypingWord(fullText, cursorIndexPosition);
        const matches = getPredictions(word);

        const [firstMatch] = matches;
        const prediction = firstMatch || "";

        terminal.setState({
          prediction,
          currentWord: word,
          matches: matches.slice(0, 10),
          options: {
            selected: 0,
            length: matches.length,
          },
        });
        if (state.currentWord.length > 1 && state.prediction) {
          terminal.renderInlineSuggestion();
          terminal.renderOptions();
        } else {
          select(".suggestion").hide();
        }
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
          if(token) {
            const [image, fileExtension] = imageType.split("/");
            const fileName = `${nanoid()}.${fileExtension}`;
            try {
              const { url } = await fetch(`${configuration.file_service.api}?fileName=${fileName}`, {
                method: "POST",
                headers: {
                  "x-secret-token": token,
                  accept: "application/json",
                  "content-type": "application/octet-stream",
                },
                body: blob,
              })
                .then(handleErrorResponse)
                .then((response) => response.json());
            } catch (error) {
              console.error('error', error);
              notify.error(
                `Uploading file failed 💥! Error$ ${error.message}`
              );
            }

              select(".terminal").insertAtCaret(`![image](${url})`);
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
