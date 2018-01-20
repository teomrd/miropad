/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
hashCode = function(s) {
  var h = 0,
    l = s.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
};

function prettifyJSON(selector) {
  const el = document.querySelector(selector);
  prettifiedJSON = JSON.stringify(JSON.parse(el.value), null, 2);
  el.value = prettifiedJSON;
}

function saveToLocalStorage(what) {
  if (what.length) {
    const hash = hashCode(what);
    localStorage.setItem(hash, what);
    window.location.assign(`#${hash}`);
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

function getSavedState() {
  const hash = window.location.hash.substr(1);
  const savedTxt = localStorage.getItem(hash);
  console.log("savedTxt", savedTxt);
  const el = document.querySelector(".terminal");
  el.value = savedTxt;
}

(function() {
  document.onkeydown = ListenToKeyboard;
  getSavedState();
})();
