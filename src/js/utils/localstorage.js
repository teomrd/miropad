import notify from "../components/molecules/notify.js";
import { isArray } from "./isArray.ts";

const storage = (() => {
  return {
    set: function (key, what) {
      localStorage.setItem(key, what);
      return this;
    },
    update: function (key, attr) {
      const current = JSON.parse(this.get(key));
      localStorage.setItem(
        key,
        JSON.stringify({
          ...current,
          ...attr,
        }),
      );
      return this;
    },
    remove: function (key) {
      localStorage.removeItem(key);
      return this;
    },
    get: function (key) {
      if (isArray(key)) {
        return key.reduce((acc, k) => {
          return {
            ...acc,
            [k]: this.get(k),
          };
        }, {});
      }

      return localStorage.getItem(key);
    },
    parse: function (key) {
      const value = this.get(key);
      return JSON.parse(value);
    },
    getDictionary: function () {
      const savedTxt = localStorage.getItem("__dictionary__");
      return savedTxt ? JSON.parse(savedTxt) : [];
    },
    removeFromDictionary: function (word) {
      const currentDictionary = this.getDictionary();
      const newDictionary = currentDictionary.filter((w) => {
        return w !== word;
      });

      localStorage.setItem("__dictionary__", JSON.stringify(newDictionary));
    },
    saveToDictionary: async function (what) {
      if (what.length) {
        try {
          const cleanText = what.toLowerCase().replace(/[^a-zA-Zά-ώΑ-Ω]/g, " ");
          const current = await this.getDictionary();
          const words = [
            ...cleanText.split(" ").filter((w) => w.length > 3),
            ...current,
          ];
          const distinctWords = [...new Set(words)];
          localStorage.setItem("__dictionary__", JSON.stringify(distinctWords));
        } catch (e) {
          notify.error(
            `😱 Something went wrong while trying to save to local storage ${e}`,
          );
        }
      } else {
        notify.warning("😕 Nothing to save!");
      }
      return this;
    },
  };
})();

export default storage;
