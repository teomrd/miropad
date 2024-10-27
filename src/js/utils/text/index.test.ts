import { findCurrentLine } from "./index.ts";

describe("text utils", () => {
  describe("findCurrentLine", () => {
    const text = `# hello

* some
* stuff
* last line`;

    it("should return the current line where the caret is", async () => {
      const line = findCurrentLine(text, 15);

      expect(line).toBe("* some");
    });

    it("should return the first line when caret at the end of line", async () => {
      const line = findCurrentLine(text, 7);

      expect(line).toBe("# hello");
    });

    it("should return the first line when caret at the start of the line", async () => {
      const line = findCurrentLine(text, 0);

      expect(line).toBe("# hello");
    });

    it("should return the first line when caret at the middle of the line", async () => {
      const line = findCurrentLine(text, 4);

      expect(line).toBe("# hello");
    });

    it("should return the empty line when caret is there", async () => {
      const line = findCurrentLine(text, 8);

      expect(line).toBe("");
    });
  });
});
