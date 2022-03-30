const groupByFrequency = (entries) => {
  return Object.entries(entries).reduce((acc, [word, frequency]) => {
    const cc = acc[frequency] || [];
    return {
      ...acc,
      [frequency]: [word, ...cc],
    };
  }, {});
};

const Node = () => ({
  char: null,
  children: {},
  frequency: 0,
  hasChildren: function () {
    return Object.keys(this.children).length > 0;
  },
  isWord: function () {
    return this.frequency > 0;
  },
  contains: function (char) {
    return Object.keys(this.children).includes(char);
  },
  getWords: function (prefix, dictionary = {}) {
    if (this.isWord()) {
      // Super weirdly this DOES NOT work by adding the word
      // in the object with the spread operator.
      dictionary[prefix] = this.frequency;
    }

    if (this.hasChildren()) {
      for (const node of Object.values(this.children)) {
        node.getWords(`${prefix}${node.char}`, dictionary);
      }
    }

    return dictionary;
  },
  increaseFrequency: function () {
    this.frequency = this.frequency + 1;
  },
  insert: function (word) {
    const [firstChar, ...rest] = word;
    if (firstChar) {
      const isLast = rest.length === 0;
      if (this.contains(firstChar)) {
        const node = this.children[firstChar];
        node.char = firstChar;
        if (isLast) node.increaseFrequency();

        return node.insert(rest);
      } else {
        const node = this.insertNode(firstChar, isLast);
        return node.insert(rest);
      }
    }
  },
  insertNode: function (char, isLast = false) {
    const newNode = Node();
    if (isLast) newNode.increaseFrequency();
    newNode.char = char;
    this.children = {
      ...this.children,
      [char]: newNode,
    };
    return newNode;
  },
});

const Trie = () => {
  const rootNode = Node();

  return {
    insert: function (word = "") {
      rootNode.insert(word);
      return rootNode;
    },
    search: function (prefix = "") {
      let node = rootNode;
      prefix.split("").forEach((character) => {
        node = node.children[character];
      });

      return node.getWords(prefix);
    },
    // get sorted matching words
    // first by frequency
    // and then alphabetically
    getMatchingWords: function (prefix = "") {
      const frequencyGroups = groupByFrequency(this.search(prefix));
      return Object.keys(frequencyGroups)
        .sort((a, b) => parseInt(b, 10) - parseInt(a, 10))
        .flatMap((key) => frequencyGroups[key].sort());
    },
  };
};

module.exports = {
  Trie,
};
