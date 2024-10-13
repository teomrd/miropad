import { isArray } from "./isArray";

const select = (selector) => ({
  el: document.querySelector(selector),
  elements: document.querySelectorAll(selector),
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
  innerHTML(htmlString) {
    this.el.innerHTML = htmlString;
    return this;
  },
  html(content) {
    this.el.innerHTML = "";
    this.append(content);
    return this;
  },
  append(el) {
    const elements = isArray(el) ? el : [el];
    elements.forEach((e) => {
      const newContent = isElement(e) ? e : document.createTextNode(e);
      this.el.appendChild(newContent);
    });
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
  show(shouldShow = true) {
    if (shouldShow) {
      this.removeClass("hidden");
    } else {
      this.hide();
    }
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
  listenAll(event, fn) {
    const elements = Array.prototype.slice.call(this.elements);
    elements.map((el) => {
      el.addEventListener(event, (e) => fn(e.srcElement));
    });
    return this;
  },
  listen(event, fn) {
    this.el.addEventListener(event, (e) => fn(e, this));
    return this;
  },
  click() {
    if (this.el) {
      this.el.click();
    }
  },
  checked(value) {
    this.el.checked = !!value;
    return this;
  },
  disable(shouldDisable = true) {
    this.el.disabled = shouldDisable;
    return this;
  },
});

export const isElement = (obj) => {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    console.error('isElement', e)
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
};

export default select;
