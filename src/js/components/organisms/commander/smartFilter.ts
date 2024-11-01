import { isArraySorted } from "../../../utils/isArraySorted.ts";

export const smartFilter = (phrase: string, filter: string) => {
  const wordParts = phrase.split(" ").map((w) => w.toLowerCase());
  const filterParts = filter.split(" ").map((f) => f.toLowerCase());
  const indexes = filterParts.map((f) => {
    const foundIndexes = wordParts.map((w, i) => {
      return w.includes(f) ? i : -1;
    });
    const firstIndexFound = foundIndexes.reduce((currentValue, fi) => {
      return fi > -1 ? fi : currentValue;
    }, -1);
    return firstIndexFound;
  });

  if (indexes.includes(-1)) {
    return false;
  }
  return isArraySorted(indexes);
};
