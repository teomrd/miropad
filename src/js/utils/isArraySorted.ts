export const isArraySorted = (arr: Array<number>) => {
  const someArray = arr.reduce((currentValue, item) => {
    if (currentValue.length === 0) {
      return [item];
    }
    const max = Math.max(...currentValue);
    return [...currentValue, ...(item >= max ? [item] : [])];
  }, [] as Array<number>);
  return someArray.length === arr.length;
};
