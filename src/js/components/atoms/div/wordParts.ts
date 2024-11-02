export const wordParts = (word: string, match: string) => {
  const parts = word.toLowerCase().split(match);

  let indexInWord = 0;
  return parts
    // @ts-ignore js-to-ts wider refactoring required
    .reduce((acc, part, i) => {
      return [...acc, ...(i === 0 ? [part] : [match, part])];
    }, [])
    // @ts-ignore js-to-ts wider refactoring required
    .filter((p) => p !== "")
    // @ts-ignore js-to-ts wider refactoring required
    .map((syllable) => {
      indexInWord = indexInWord + syllable.length;
      const start = indexInWord - syllable.length;
      const end = start + syllable.length;
      const originalSyllable = word.slice(start, end);
      return originalSyllable;
    });
};
