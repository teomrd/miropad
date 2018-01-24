import hashCode from './hashCode';

export const saveToLocalStorage = (what) => {
  if (what.length) {
    const hash = hashCode(what);
    try {
      localStorage.setItem(hash, what);
      window.location.assign(`#${hash}`);
    } catch (e) {
      console.error(`Something went wrong while trying to save to local storage ${e}`); // eslint-disable-line
    }
  } else {
    console.log('Nothing to save!'); // eslint-disable-line
  }
};

export const getSavedState = () => {
  const hash = window.location.hash.substr(1);
  const savedTxt = localStorage.getItem(hash);
  return savedTxt;
};
