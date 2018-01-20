function prettifyJSON(selector) {
  const el = document.querySelector(selector);
  prettifiedJSON = JSON.stringify(JSON.parse(el.value), null, 2);
  el.value = prettifiedJSON;
}

function saveToLocalStorage(what) {
  if (what.length) {
    localStorage.setItem(
      new Date().toDateString() + " " + new Date().toTimeString(),
      what
    );
  } else {
    alert("Nothing to save!");
  }
}

function ListenToKeyboard(e) {
  var evtobj = window.event ? event : e;
  // Control + p
  if (evtobj.keyCode == 80 && evtobj.ctrlKey) {
    prettifyJSON(".terminal");
  }
  // Control + s
  if (evtobj.keyCode == 83 && evtobj.ctrlKey) {
    e.preventDefault();
    const text = document.querySelector(".terminal").value;
    saveToLocalStorage(text);
  }
}

(function() {
  document.onkeydown = ListenToKeyboard;
})();
