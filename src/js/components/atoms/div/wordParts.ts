export const wordParts = (word, match) => {
  const parts = word.toLowerCase().split(match);

  let indexInWord = 0;
  return parts
    .reduce((acc, part, i) => {
      return [...acc, ...(i === 0 ? [part] : [match, part])];
    }, [])
    .filter((p) => p !== "")
    .map((syllable) => {
      indexInWord = indexInWord + syllable.length;
      const start = indexInWord - syllable.length;
      const end = start + syllable.length;
      const originalSyllable = word.slice(start, end);
      return originalSyllable;
    });
};
