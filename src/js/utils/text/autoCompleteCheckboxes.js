import select from '../dom';
import { findCurrentLine } from './index';

export const autoCompleteCheckboxes = (e) => {
  const currentLine = findCurrentLine(e.target.value, e.target.selectionEnd);

  const completers = {
    '* [': '\n* [] ',
    '* ': '\n* ',
    ' * [': '\n * [] ',
    ' * ': '\n * ',
  };

  for (const [startsWith, compleano] of Object.entries(completers)) {
    if (currentLine.startsWith(startsWith)) {
      e.preventDefault();
      select('.terminal').insertAtCaret(compleano);
      break;
    }
  }
};
