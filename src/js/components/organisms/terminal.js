import getCaretCoordinates from "textarea-caret";
import storage from "../../utils/localstorage";
import select from "../../utils/dom";
import commander from "./commander/commander";
import { getNote } from "./noteManager/noteManager";
import { div } from "../atoms/div/div";
import { command } from "../molecules/commands/command";

const createAutocompletionList = (words, anchorEl) => {
  const options = words.map((word) =>
    command({
      title: div({ content: word }),
      onclick: (e) => {
        console.log("Hello there", e);
      },
    })
  );
  const optionList = document.createElement("ul");
  optionList.classList.add("options");
  optionList.classList.add("frost");
  options.forEach((el) => optionList.append(el));
  anchorEl.append(optionList);
};

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

export const initTerminal = () => {
  select(".suggestion").listen("click", acceptCompletion);
  select(".terminal")
    .listen("focus", () => {
      commander.hide();
      select(".note-info").hide();
    })
    .listen("input", (e) => {
      const cursorIndexPosition = e.target.selectionEnd;
      const fullText = select(".terminal").getValue();

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

        storage.set("__prediction__", prediction);
        storage.set("__word__", word);

        const inlineSuggestion = div({
          content: `${prediction.slice(word.length)}`,
        });
        inlineSuggestion.setAttribute("id", "inlineSuggestion");
        select(".suggestion").show().html(inlineSuggestion);

        createAutocompletionList(matches, select(".suggestion").el);
      }
    })
    .listen("keydown", (e) => {
      if (e.keyCode === 32) {
        storage.set("__prediction__", "");
      }
      // tab feature
      if (e.keyCode === 9) {
        e.preventDefault();
        acceptCompletion();
      }
    })
    .listen("keyup", () => {
      const currentNote = getNote();
      const { text = "" } = currentNote || {};
      const isNoteUnSaved = select(".terminal").getValue() !== text;
      // unsaved state UI indication
      if (currentNote) {
        if (isNoteUnSaved) {
          select("#save").addClass("unsaved");
        } else {
          select("#save").removeClass("unsaved");
        }
      }
    });
};
