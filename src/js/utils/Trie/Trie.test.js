const { Trie } = require("./Trie");

describe("trie data structure", () => {
  describe("insertion of a word", () => {
    it("insert a new word into trie", () => {
      const t = Trie();
      t.insert("was");
      t.insert("was");
      t.insert("where");
    });
  });

  describe("search with prefix", () => {
    it("should return all the words matching the given prefix", () => {
      const t = Trie();
      t.insert("watch");
      t.insert("watcher");
      t.insert("watching");
      t.insert("watching");
      t.insert("where");
      t.insert("where");
      t.insert("was");

      expect(t.search("wa")).toEqual({
        watching: 2,
        watcher: 1,
        watch: 1,
        was: 1,
      });
    });

    it("should return all the words matching the given prefix", () => {
      const t = Trie();
      t.insert("awe");
      t.insert("words");
      t.insert("watch");
      t.insert("watcher");
      t.insert("awake");
      t.insert("watching");
      t.insert("watching");
      t.insert("watching");
      t.insert("words");
      t.insert("where");
      t.insert("where");
      t.insert("was");

      expect(t.search("w")).toEqual({
        watching: 3,
        where: 2,
        words: 2,
        was: 1,
        watch: 1,
        watcher: 1,
      });

      expect(t.getMatchingWords("w")).toEqual([
        "watching",
        "where",
        "words",
        "was",
        "watch",
        "watcher",
      ]);

      expect(t.search("a")).toEqual({
        awake: 1,
        awe: 1,
      });

      expect(t.getMatchingWords("a")).toEqual(["awake", "awe"]);
    });
  });
});
