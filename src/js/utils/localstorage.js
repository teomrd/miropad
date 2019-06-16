import hashBrowser from "./hashBrowser";
import notify from "../notify";

const storage = {
  set: function(key, what) {
    localStorage.setItem(key, what);
  },
  get: function(key) {
    localStorage.getItem(key);
  },
  saveToLocalStorage: async function(what) {
    await this.saveToDictionary(what);
    if (what.length) {
      const hash = await hashBrowser(what);
      try {
        localStorage.setItem(hash, what);
        window.location.assign(`#${hash}`);
        notify.success("👌 Note saved!");
      } catch (e) {
        notify.error(
          `😱 Something went wrong while trying to save to local storage ${e}`
        ); // eslint-disable-line
      }
    } else {
      notify.warning("😕 Nothing to save!"); // eslint-disable-line
    }
    return this;
  },
  getSavedState: () => {
    const hash = window.location.hash.substr(1);
    const savedTxt = localStorage.getItem(hash);
    return savedTxt;
  },
  getDictionary: () => {
    const savedTxt = localStorage.getItem("dictionary");
    return savedTxt ? JSON.parse(savedTxt) : [];
  },
  saveToDictionary: async function(what) {
    if (what.length) {
      try {
        const cleanText = what.toLowerCase().replace(/[^a-zA-Z0-9]/g, " ");
        const current = await this.getDictionary();
        const words = [
          ...cleanText.split(" ").filter(w => w.length > 3),
          ...current
        ];
        const distinctWords = [...new Set(words)];
        localStorage.setItem("dictionary", JSON.stringify(distinctWords));
      } catch (e) {
        notify.error(
          `😱 Something went wrong while trying to save to local storage ${e}`
        ); // eslint-disable-line
      }
    } else {
      notify.warning("😕 Nothing to save!"); // eslint-disable-line
    }
    return this;
  }
};

export default storage;
