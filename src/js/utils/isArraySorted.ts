export const isArraySorted = (arr: Array<any>) => {
  const someArray = arr.reduce((currentValue, item) => {
    if (currentValue.length === 0) {
      return [item];
    }
    const max = Math.max(...currentValue);
    return [...currentValue, ...(item >= max ? [item] : [])];
  }, []);
  return someArray.length === arr.length;
};
