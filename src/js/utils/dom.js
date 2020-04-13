const isArray = (what) => typeof what === "object" && what.length > 0;

const select = (el) => ({
  el: document.querySelector(el),
  placeholder(what) {
    this.el.placeholder = what;
    return this;
  },
  getValue() {
    return this.el.value;
  },
  insertAtCaret(text) {
    this.el.setRangeText(
      text,
      this.el.selectionStart,
      this.el.selectionEnd,
      "end"
    );
    return this;
  },
  setValue(value) {
    this.el.value = value;
    const event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    this.el.dispatchEvent(event);
    return this;
  },
  html(content) {
    this.el.innerHTML = content;
    return this;
  },
  append(el) {
    const elements = isArray(el) ? el : [el];
    elements.forEach((e) => this.el.appendChild(e));
    return this;
  },
  appendListElement(text) {
    const li = document.createElement("LI");
    li.appendChild(document.createTextNode(text));
    this.el.appendChild(li);
    return this;
  },
  removeClass(className) {
    this.el.classList.remove(className);
    return this;
  },
  removeClasses(classes = []) {
    classes.map((className) => this.removeClass(className));
    return this;
  },
  addClass(className) {
    this.el.classList.add(className);
    return this;
  },
  hasClass(cls) {
    return (" " + this.el.className + " ").indexOf(" " + cls + " ") > -1;
  },
  show() {
    this.removeClass("hidden");
    return this;
  },
  hide() {
    this.addClass("hidden");
    return this;
  },
  toggle(className = "hidden") {
    if (this.hasClass(className)) this.removeClass(className);
    else this.addClass(className);
    return this;
  },
  focus() {
    this.el.focus();
    return this;
  },
  listen(event, fn) {
    this.el.addEventListener(event, fn);
    return this;
  },
  click() {
    if (this.el) {
      this.el.click();
    }
  },
});

export default select;
