import '../css/styles.css';
import prettifyJSON from './utils/prettifyJSON';
import { saveToLocalStorage, getSavedState } from './utils/localstorage';
import welcomeUser from './welcome';
// import keyListener from './utils/keyListener';

const listeners = (e) => {
  const evtobj = window.event || e;
  // Control + P
  if (evtobj.keyCode === 80 && evtobj.ctrlKey) {
    e.preventDefault();
    prettifyJSON('.terminal');
  }
  // Control + S
  if (evtobj.keyCode === 83 && evtobj.ctrlKey) {
    e.preventDefault();
    const text = document.querySelector('.terminal').value;
    saveToLocalStorage(text);
  }
};

const main = () => {
  welcomeUser();

  document.onkeydown = listeners;

  // keyListener.listen();

  const savedTxt = getSavedState();
  document.querySelector('.terminal').value = savedTxt;
};

export default main;
