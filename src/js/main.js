import '../css/styles.css';
import prettifyJSON from './utils/prettifyJSON';
import { saveToLocalStorage, getSavedState } from './utils/localstorage';
import welcomeUser from './welcome';
import keyListener from './utils/keyListener';
import errorHandler from './utils/errorHandler';

const main = () => {
  window.onerror = errorHandler;

  welcomeUser();

  keyListener
    .listen()
    .on('p', () => prettifyJSON('.terminal'))
    .on('s', () => {
      const text = document.querySelector('.terminal').value;
      saveToLocalStorage(text);
    });

  const savedTxt = getSavedState();
  document.querySelector('.terminal').value = savedTxt;
};

export default main;
