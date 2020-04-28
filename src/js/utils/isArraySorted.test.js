const isArraySorted = require("./isArraySorted");

describe("isArraySorted", () => {
  it("should return true when array is sorted", () => {
    expect(isArraySorted([-100, -50, 200])).toEqual(true);
    expect(isArraySorted([1, 2, 3])).toEqual(true);
    expect(isArraySorted([100, 220, 33214])).toEqual(true);
  });

  it("should return false when not", () => {
    expect(isArraySorted([2, 1, 3])).toEqual(false);
    expect(isArraySorted([1000000, 220, 33214])).toEqual(false);
    expect(isArraySorted([0, -1, 1])).toEqual(false);
  });
});
