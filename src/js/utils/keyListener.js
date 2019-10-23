const keyListener = {
  events: [],
  on(key, fn) {
    if (typeof key === "object" && typeof fn === "undefined") {
      key.map(k => this.on(k.key, k.call));
      return this;
    }

    if (key && typeof key === "string" && fn && typeof fn === "function") {
      this.events = [
        ...this.events,
        {
          key,
          fn() {
            fn();
          }
        }
      ];
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
