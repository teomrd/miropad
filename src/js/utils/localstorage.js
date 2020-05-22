import notify from "../components/molecules/notify";

const storage = {
  set: function (key, what) {
    localStorage.setItem(key, what);
    return this;
  },
  get: (key) => {
    return localStorage.getItem(key);
  },
  getDictionary: () => {
    const savedTxt = localStorage.getItem("__dictionary__");
    return savedTxt ? JSON.parse(savedTxt) : [];
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
          `😱 Something went wrong while trying to save to local storage ${e}`
        ); // eslint-disable-line
      }
    } else {
      notify.warning("😕 Nothing to save!"); // eslint-disable-line
    }
    return this;
  },
};

export default storage;
