import hashCode from './hashCode';
import notify from '../notify';

export const saveToLocalStorage = (what) => {
  if (what.length) {
    const hash = hashCode(what);
    try {
      localStorage.setItem(hash, what);
      window.location.assign(`#${hash}`);
      notify.sucess('Note saved!');
    } catch (e) {
      notify.error(`Something went wrong while trying to save to local storage ${e}`); // eslint-disable-line
    }
  } else {
    notify.warning('Nothing to save!'); // eslint-disable-line
  }
};

export const getSavedState = () => {
  const hash = window.location.hash.substr(1);
  const savedTxt = localStorage.getItem(hash);
  return savedTxt;
};
