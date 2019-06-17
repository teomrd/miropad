const keyListener = {
  events: [],
  on(key, fn) {
    if (key && fn && typeof fn === "function") {
      this.events = [
        ...this.events,
        {
          key,
          fn() {
            fn();
          }
        }
      ];
    } else {
      throw Error("on method does not have all the required parameters");
    }
    return this;
  },
  listen() {
    document.addEventListener("keydown", e => {
      this.handleEvent(e);
    });
    return this;
  },
  handleEvent(e) {
    this.events.map(event => {
      if (event.key === e.key && (e.ctrlKey === true || e.metaKey === true)) {
        e.preventDefault();
        event.fn();
      }
      return true;
    });
  }
};

export default keyListener;
