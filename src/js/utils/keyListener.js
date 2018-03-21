const keyListener = {
  events: [],
  on(key, fn, control = true) {
    if (key && fn) {
      this.events = [
        ...this.events,
        {
          key,
          ctrlKey: control,
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
      if (event.key === e.key && event.ctrlKey === e.ctrlKey) {
        e.preventDefault();
        event.fn();
      }
      return true;
    });
  }
};

export default keyListener;
