import wordParts from "./wordParts";

const mark = (word) => {
  const markEl = document.createElement("mark");
  markEl.appendChild(document.createTextNode(word));
  return markEl;
};

export const div = ({ content = "", highlight = "" }) => {
  const div = document.createElement("div");
  const words = content.split(" ");
  const wordToHighlight = highlight.toLowerCase();

  words.forEach((w) => {
    const word = w.toLocaleLowerCase();
    if (word.includes(wordToHighlight) && wordToHighlight !== "") {
      if (word === wordToHighlight) {
        div.appendChild(mark(w));
      } else {
        const parts = wordParts(w, wordToHighlight);
        const wordElements = parts.map((syllable) =>
          syllable.toLowerCase() === wordToHighlight
            ? mark(syllable)
            : document.createTextNode(syllable)
        );
        wordElements.forEach((w) => {
          div.appendChild(w);
        });
      }
    } else {
      div.appendChild(document.createTextNode(` ${w} `));
    }
  });

  return div;
};
