import getCaretCoordinates from "textarea-caret";
import { terminal } from "../../components/organisms/terminal";
import select from "../../utils/dom";
import { trieDictionary } from "../../main";
import {
  getCurrentlyTypingWord,
  isLastCharacterInTheWord,
  placeSuggestion,
} from "../autocomplete";
import { getNotes } from "../../components/organisms/noteManager/noteManager";

export const renderInterNotes = (e: any) => {
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
  if (word.startsWith("#")) {
    const shouldDisplaySuggestion =
      e.inputType === "insertText" &&
      isLastCharacterInTheWord(fullText, cursorIndexPosition);

    if (shouldDisplaySuggestion) {
      placeSuggestion(e.target);
      const allNoteIds = getNotes().map((note) => note.id);
      const actualNoteSearch = word.slice(1);
      const matches = allNoteIds.filter((noteId) => {
        return noteId.startsWith(actualNoteSearch);
      });
      const [firstMatch] = matches;
      const prediction = firstMatch;
      const currentWord = actualNoteSearch;

      terminal.setState({
        prediction,
        currentWord,
        matches: matches.slice(0, 10),
        options: {
          selected: 0,
          length: matches.length,
        },
      });
      const state = terminal.getState();
      if (
        state.currentWord &&
        state.prediction &&
        state.currentWord.length > 1
      ) {
        terminal.renderInlineSuggestion();
        terminal.renderOptions();
      } else {
        select(".suggestion").hide();
      }
    }
  }
};
