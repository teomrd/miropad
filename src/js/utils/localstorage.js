import hashBrowser from './hashBrowser';
import notify from '../notify';

export const saveToLocalStorage = async (what) => {
  if (what.length) {
    const hash = await hashBrowser(what);
    try {
      localStorage.setItem(hash, what);
      window.location.assign(`#${hash}`);
      notify.success('👌 Note saved!');
    } catch (e) {
      notify.error(`😱 Something went wrong while trying to save to local storage ${e}`); // eslint-disable-line
    }
  } else {
    notify.warning('😕 Nothing to save!'); // eslint-disable-line
  }
};

export const getSavedState = () => {
  const hash = window.location.hash.substr(1);
  const savedTxt = localStorage.getItem(hash);
  return savedTxt;
};
