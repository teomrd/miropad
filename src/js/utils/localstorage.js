import hashBrowser from "./hashBrowser";
import notify from "../notify";
import IPFS from "ipfs";
import setPageTitle from "./pageTitle";

const storage = {
  set: function(key, what) {
    localStorage.setItem(key, what);
  },
  get: function(key) {
    return localStorage.getItem(key);
  },
  saveToIPFS: async function(value) {
    try {
      const ipfs = await IPFS.create();
      const content = IPFS.Buffer.from(value);
      const results = await ipfs.add(content);
      const hash = results[0].hash;
      window.location.assign(`#${hash}`);
      notify.success("👌 Note saved to IPFS!");
    } catch (e) {
      notify.error(`😱 Something went wrong while trying to save to IPFS ${e}`); // eslint-disable-line
    }
  },
  saveToLocalStorage: async function(what) {
    await this.saveToDictionary(what);
    if (what.length) {
      const hash = await hashBrowser(what);
      try {
        const title = what
          .split("\n")[0]
          .trim()
          .replace("#", "")
          .replace(/[^\w\s]/gi, "")
          .trim();
        const titleID = encodeURIComponent(title);
        const currentNote = this.get(title);
        const note = JSON.parse(currentNote);
        setPageTitle(title);
        localStorage.setItem(
          titleID,
          JSON.stringify({
            title,
            revisions: {
              ...((note && note.revisions) || {}),
              [hash]: {
                dateCreated: Date.now(),
                text: what
              }
            }
          })
        );
        window.location.assign(`#${title}?v=${hash}`);
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
  getLocalValue: key => {
    return localStorage.getItem(key);
  },
  getDictionary: () => {
    const savedTxt = localStorage.getItem("dictionary");
    return savedTxt ? JSON.parse(savedTxt) : [];
  },
  saveToDictionary: async function(what) {
    if (what.length) {
      try {
        const cleanText = what
          .toLowerCase()
          .replace(/[^a-zA-Z0-9ά-ώΑ-Ω]/g, " ");
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
