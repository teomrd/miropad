const isArraySorted = require("../../../utils/isArraySorted");

const smartFilter = (phrase, filter) => {
  const wordParts = phrase.split(" ").map((w) => w.toLowerCase());
  const filterParts = filter.split(" ").map((f) => f.toLowerCase());
  const indexes = filterParts.map((f) => {
    const foundIndexes = wordParts.map((w, i) => {
      return w.includes(f) ? i : -1;
    });
    const firstIndexFound = foundIndexes.reduce((currentValue, fi) => {
      return fi > 0 ? fi : currentValue;
    }, -1);
    return firstIndexFound;
  });

  if (indexes.includes(-1)) {
    return false;
  }
  return isArraySorted(indexes);
};

module.exports = {
  smartFilter,
};
