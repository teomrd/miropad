import getCaretCoordinates from "textarea-caret";
import storage from "../../utils/localstorage";
import select from "../../utils/dom";
import commander from "./commander/commander";
import { getNote } from "./noteManager/noteManager";

const isLastCharacterInTheWord = (text, characterIndex) =>
  text[characterIndex] === undefined || text[characterIndex].trim() === "";

const placeSuggestion = (textEl) => {
  const coords = getCaretCoordinates(textEl, textEl.selectionEnd);
  const { top, left } = coords;
  select(".suggestion").el.style.top = `${top + 20}px`;
  select(".suggestion").el.style.left = `${left - 30}px`;
};

const acceptCompletion = () => {
  const prediction = storage.get("__prediction__");
  const word = storage.get("__word__");
  const completion = prediction.replace(word.toLowerCase(), "");
  const autoComplete = completion && completion !== "";
  if (autoComplete) {
    const where = select(".terminal").el.selectionEnd;
    const theEndCharIndex = select(".terminal").getValue().trim().length;
    const isItTheEnd = where === theEndCharIndex;
    select(".terminal").insertAtCaret(`${completion}${isItTheEnd ? " " : ""}`);
  } else {
    select(".terminal").insertAtCaret("  ");
  }
  select(".suggestion").hide();
  storage.set("__prediction__", "");
};

export const initTerminal = () => {
  select(".suggestion").listen("click", acceptCompletion);
  select(".terminal")
    .listen("focus", () => commander.hide())
    .listen("input", (e) => {
      const characterIndex = e.target.selectionEnd;
      const text = select(".terminal").getValue();
      const charTyped = text[characterIndex - 1];
      if (e.inputType === "deleteContentBackward" || charTyped === " ") {
        storage.set("__prediction__", "");
        select(".suggestion").hide();
      }
      if (
        e.inputType === "insertText" &&
        isLastCharacterInTheWord(text, characterIndex)
      ) {
        placeSuggestion(e.target);
        const dictionary = storage.getDictionary();
        let word = "";
        let currentIndex = characterIndex - 1;
        do {
          const character = text[currentIndex] || "";
          currentIndex = character.trim() === "" ? -1 : currentIndex - 1;
          word = character.trim() !== "" ? `${character}${word}` : word;
        } while (currentIndex >= 0);

        const sanitizedWord = word.replace(/[\r\n\t]+/g, "").toLowerCase();
        if (sanitizedWord.length > 1) {
          const firstMatch = dictionary.find((word) =>
            word.startsWith(sanitizedWord)
          );
          const prediction = firstMatch || "";
          storage.set("__prediction__", prediction);
          storage.set("__word__", word);
          select(".suggestion").show().html(`${prediction}`);
        }
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
