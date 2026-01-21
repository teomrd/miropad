import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { Trie } from "./Trie.ts";

describe("trie data structure", () => {
  it("insert a new word into trie", () => {
    const t = Trie();
    t.insert("was");
    t.insert("was");
    t.insert("where");

    expect(t.search("w")).toEqual({
      was: 2,
      where: 1,
    });
  });

  describe("search with prefix", () => {
    it("should return all the words matching the given prefix", () => {
      const t = Trie();
      const lexicon = [
        "watch",
        "watcher",
        "watching",
        "watching",
        "where",
        "where",
        "was",
      ];

      expect(t.insert(lexicon).search("wa")).toEqual({
        watching: 2,
        watcher: 1,
        watch: 1,
        was: 1,
      });
    });

    it("should return all the words matching the given prefix", () => {
      const t = Trie();
      t.insert("awe")
        .insert("words")
        .insert("watch")
        .insert("watcher")
        .insert("awake")
        .insert("watching")
        .insert("watching")
        .insert("watching")
        .insert("words")
        .insert("where")
        .insert("where")
        .insert("was");

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

    it("should return an empty set of results, when no matching words", () => {
      const t = Trie();
      t.insert("awe")
        .insert("words")
        .insert("watch")
        .insert("watcher")
        .insert("awake")
        .insert("watching")
        .insert("watching")
        .insert("watching")
        .insert("words")
        .insert("where")
        .insert("where")
        .insert("was");

      expect(t.search("o")).toEqual({});

      expect(t.getMatchingWords("o")).toEqual([]);
    });
  });
});
