class Notify {
  constructor() {
    this.notificationContainer = document.querySelector('#notification');
  }

  hideAfter(ms) {
    setTimeout(() => {
      this.hide();
    }, ms);
  }

  display() {
    this.notificationContainer.style.display = 'block';
  }

  hide() {
    this.notificationContainer.style.display = 'none';
  }

  info(message) {
    this.notificationContainer.innerHTML = `😀 ${message}`;
    this.display();
    this.hideAfter(2000);
  }

  error(message) {
    this.notificationContainer.innerHTML = `😢 ${message}`;
    this.display();
    this.hideAfter(2000);
  }
}

const notify = new Notify();
export default notify;
