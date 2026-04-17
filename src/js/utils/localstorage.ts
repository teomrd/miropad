import notify from "../components/molecules/notify.ts";

const storage = (() => {
  return {
    set: function (key: string, what: string) {
      localStorage.setItem(key, what);
      return this;
    },
    usage: async function (): Promise<{
      quota: number;
      usage: number;
      usageInMB: number;
      usagePercent: string;
      quotaInMB: string;
    }> {
      const { quota, usage } = await navigator.storage.estimate();
      return quota && usage
        ? {
          quota,
          usage,
          usageInMB: usage / 1024 / 1024,
          usagePercent: ((usage / quota) * 100).toFixed(2),
          quotaInMB: (quota / 1024 / 1024).toFixed(2),
        }
        : {
          quota: 0,
          usage: 0,
          usageInMB: 0,
          usagePercent: "0.00",
          quotaInMB: "0.00",
        };
    },
    update: function (key: string, attr: object) {
      const current = this.get(key);
      if (typeof current === "string") {
        const currentValue = JSON.parse(current);
        localStorage.setItem(
          key,
          JSON.stringify({
            ...currentValue,
            ...attr,
          }),
        );
      }
      return this;
    },
    remove: function (key: string) {
      localStorage.removeItem(key);
      return this;
    },
    get: function (key: string): string | null {
      return localStorage.getItem(key);
    },
    getKeys: function <T extends string>(keys: Array<T>): Record<T, unknown> {
      return keys.reduce<Record<T, unknown>>(
        (acc, k) => {
          return {
            ...acc,
            [k]: this.get(k),
          };
        },
        {} as Record<T, unknown>,
      );
    },
    parse: function (key: string) {
      const value = this.get(key);
      return typeof value === "string" ? JSON.parse(value) : value;
    },
    getDictionary: function (): string[] {
      const savedTxt = localStorage.getItem("__dictionary__");
      return savedTxt ? JSON.parse(savedTxt) : [];
    },
    removeFromDictionary: function (word: string) {
      const currentDictionary = this.getDictionary();
      const newDictionary = currentDictionary.filter((w) => {
        return w !== word;
      });

      localStorage.setItem("__dictionary__", JSON.stringify(newDictionary));
    },
    saveToDictionary: function (what: string) {
      if (what.length) {
        try {
          const cleanText = what.toLowerCase().replace(/[^a-zA-Zά-ώΑ-Ω]/g, " ");
          const current = this.getDictionary();
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
