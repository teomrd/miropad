const keyListener = {
  events: [],
  on(key, fn) {
    if (Array.isArray(key)) {
      key.forEach((k) => {
        const finalKey = k.key || k;
        const functionToCall = k.call || fn;
        this.on(finalKey, functionToCall);
      });

      return this;
    }

    if (key && typeof key === "string" && fn && typeof fn === "function") {
      this.events = [
        ...this.events,
        {
          key: key.includes("shift") ? key.replace("shift", "").trim() : key,
          shift: key.includes("shift"),
          fn() {
            fn();
          },
        },
      ];
    }
    return this;
  },
  listen() {
    document.addEventListener("keydown", (e) => {
      this.handleEvent(e);
    });
    return this;
  },
  handleEvent(e) {
    this.events.map((event) => {
      if (
        event.key === e.key &&
        (e.ctrlKey === true || e.metaKey === true) &&
        e.shiftKey === event.shift
      ) {
        e.preventDefault();
        event.fn();
      }
      return true;
    });
  },
};

export default keyListener;
