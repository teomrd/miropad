class Notify {
  constructor() {
    this.notificationContainer = document.querySelector('#notification');
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
  }

  error(message) {
    this.notificationContainer.innerHTML = `😢 ${message}`;
    this.display();
  }
}

const notify = new Notify();
export default notify;
