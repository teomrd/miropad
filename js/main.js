import classes from "../css/styles.css";
import hashCode from "./utils/hashCode";

const prettifyJSON = selector => {
  const el = document.querySelector(selector);
  prettifiedJSON = JSON.stringify(JSON.parse(el.value), null, 2);
  el.value = prettifiedJSON;
};

const saveToLocalStorage = what => {
  if (what.length) {
    const hash = hashCode(what);
    localStorage.setItem(hash, what);
    window.location.assign(`#${hash}`);
  } else {
    alert("Nothing to save!");
  }
};

const ListenToKeyboard = e => {
  var evtobj = window.event ? event : e;
  // Control + p
  if (evtobj.keyCode == 80 && evtobj.ctrlKey) {
    e.preventDefault();
    prettifyJSON(".terminal");
  }
  // Control + s
  if (evtobj.keyCode == 83 && evtobj.ctrlKey) {
    e.preventDefault();
    const text = document.querySelector(".terminal").value;
    saveToLocalStorage(text);
  }
};

const getSavedState = () => {
  const hash = window.location.hash.substr(1);
  const savedTxt = localStorage.getItem(hash);
  const el = document.querySelector(".terminal");
  el.value = savedTxt;
};

const main = () => {
  console.log("main");
  document.onkeydown = ListenToKeyboard;
  getSavedState();
};

export default main;
