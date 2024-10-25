import getCaretCoordinates from "textarea-caret";
import { terminal } from "../components/organisms/terminal";
import select from "../utils/dom";
import { trieDictionary } from "../main";

const getPredictions = (word) => {
  const sanitizedWord = word.replace(/[\r\n\t]+/g, "").toLowerCase();

  return trieDictionary.getMatchingWords(sanitizedWord);
};

export const getCurrentlyTypingWord = (text, cursorIndexPosition) => {
  let word = "";
  let currentIndex = cursorIndexPosition - 1;
  do {
    const character = text[currentIndex] || "";
    currentIndex = character.trim() === "" ? -1 : currentIndex - 1;
    word = character.trim() !== "" ? `${character}${word}` : word;
  } while (currentIndex >= 0);
  return word;
};

export const placeSuggestion = (textEl) => {
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

export const isLastCharacterInTheWord = (text, characterIndex) =>
  text[characterIndex] === undefined || text[characterIndex].trim() === "";

export const autoComplete = (e: any) => {
  const cursorIndexPosition = e.target.selectionEnd;
  const fullText = terminal.el.getValue();

  const charTyped = fullText[cursorIndexPosition - 1];
  if (e.inputType === "deleteContentBackward" || charTyped === " ") {
    terminal.setState({
      prediction: null,
      currentWord: null,
    });
    return select(".suggestion").hide();
  }
  const word = getCurrentlyTypingWord(fullText, cursorIndexPosition);

  const shouldDisplaySuggestion =
    e.inputType === "insertText" &&
    isLastCharacterInTheWord(fullText, cursorIndexPosition) &&
    !word.startsWith("#");

  if (shouldDisplaySuggestion) {
    placeSuggestion(e.target);
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
    const state = terminal.getState();
    if (state.currentWord && state.prediction && state.currentWord.length > 1) {
      terminal.renderInlineSuggestion();
      terminal.renderOptions();
    } else {
      select(".suggestion").hide();
    }
  }
};
