import { smartFilter } from "./smartFilter.ts";

describe("smartFilter", () => {
  it("should return true when pattern matches", () => {
    expect(smartFilter("✍️ MiroPad ToDo list", "Miro")).toEqual(true);
    expect(smartFilter("✍️ MiroPad ToDo list", "miro")).toEqual(true);
    expect(smartFilter("✍️ MiroPad ToDo list", "todo")).toEqual(true);
    expect(smartFilter("✍️ MiroPad ToDo list", "lis")).toEqual(true);
  });

  it("should false when there is no match", () => {
    expect(smartFilter("✍️ MiroPad ToDo list", "pod")).toEqual(false);
    expect(smartFilter("✍️ MiroPad ToDo list", "last")).toEqual(false);
  });

  it("should find on the first word", () => {
    expect(smartFilter("abc def", "bc")).toEqual(true);
  });

  it("should return the right output with multiple words on the filter", () => {
    expect(smartFilter("✍️ MiroPad ToDo list", "miro to li")).toEqual(true);
    expect(smartFilter("✍️ MiroPad ToDo list", "miro li to")).toEqual(false);
    expect(smartFilter("✍️ MiroPad ToDo list", "tod l")).toEqual(true);
    expect(smartFilter("✍️ MiroPad ToDo list", "nomatch")).toEqual(false);
  });
});
