import { wordParts } from "./wordParts";

const mark = (word) => {
  const markEl = document.createElement("mark");
  markEl.appendChild(document.createTextNode(word));
  return markEl;
};

export const div = ({ content = "", highlight = "" }) => {
  const div = document.createElement("div");
  const words = content.split(" ");
  const wordsToHighlight = highlight.toLowerCase().split(" ");
  if (highlight.trim() === "") {
    div.appendChild(document.createTextNode(content));
    return div;
  }
  words
    .map((word) => {
      const matches = wordsToHighlight
        .map((wordToHighlight) => {
          return word.toLocaleLowerCase().includes(wordToHighlight)
            ? wordToHighlight
            : undefined;
        })
        .filter((m) => m !== undefined);

      return {
        word: word,
        matches: matches,
      };
    })
    .forEach(({ word, matches }) => {
      if (matches.length > 0) {
        const match = matches[0];
        if (word === match) {
          div.appendChild(mark(` ${word}`));
        } else {
          const parts = wordParts(word, match);
          const wordElements = parts.map((syllable) =>
            syllable.toLowerCase() === match
              ? mark(syllable)
              : document.createTextNode(syllable),
          );
          div.appendChild(document.createTextNode(" "));
          wordElements.forEach((w) => {
            div.appendChild(w);
          });
        }
      } else {
        div.appendChild(document.createTextNode(` ${word} `));
      }
    });
  return div;
};
