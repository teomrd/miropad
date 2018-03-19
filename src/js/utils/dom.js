const select = el => ({
  el: document.querySelector(el),
  value() {
    return this.el.value;
  },
  html(content) {
    this.el.innerHTML = content;
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
});

export default select;
