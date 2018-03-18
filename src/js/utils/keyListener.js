const keyListener = {
  listen() {
    document.addEventListener('keydown', (e) => {
      // const keyName = event.key;
      console.log('I am listening you typing!!!', e);
      this.handleEvent(e);
      // this.event = e;
    });
    return this;
  },
  handleEvent(e) {
    console.log('I am taking over now!');
    if (e.keyCode === 80 && e.ctrlKey) {
      e.preventDefault();
      console.log('PPPPPPPP');
    }
  },
};

export default keyListener;
