import localforage from "localforage";
import notify from "../components/molecules/notify";
import { isArray } from "./isArray";

const storage = (() => {
  return {
    set: async function (key, what) {
      await localforage.setItem(key, what);
      return this;
    },
    update: function (key, attr) {
      const current = JSON.parse(this.get(key));
      localforage.setItem(
        key,
        JSON.stringify({
          ...current,
          ...attr,
        })
      );
      return this;
    },
    remove: function (key) {
      localforage.removeItem(key);
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

      return localforage.getItem(key);
    },
    getDictionary: function () {
      const savedTxt = localforage.getItem("__dictionary__");
      return savedTxt ? JSON.parse(savedTxt) : [];
    },
    removeFromDictionary: function (word) {
      const currentDictionary = this.getDictionary();
      const newDictionary = currentDictionary.filter((w) => {
        return w !== word;
      });

      localforage.setItem("__dictionary__", JSON.stringify(newDictionary));
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
          localforage.setItem("__dictionary__", JSON.stringify(distinctWords));
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
  };
})();

export default storage;
