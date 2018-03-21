/* global crypto, TextEncoder */
// more info about the hashBrowser function ==> https://github.com/Chalarangelo/30-seconds-of-code#hashbrowser-

const hashBrowser = val =>
  crypto.subtle
    .digest("SHA-256", new TextEncoder("utf-8").encode(val))
    .then(h => {
      const hexes = [];
      const view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4) {
        hexes.push(`00000000${view.getUint32(i).toString(16)}`.slice(-8));
      }
      return hexes.join("");
    });

export default hashBrowser;
