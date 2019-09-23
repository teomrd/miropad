const select = el => ({
  el: document.querySelector(el),
  value() {
    return this.el.value;
  },
  html(content) {
    this.el.innerHTML = content;
    return this;
  },
  append(el) {
    this.el.appendChild(el);
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
    classes.map(className => this.removeClass(className));
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
  }
});

export default select;
