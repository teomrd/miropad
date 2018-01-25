class Notify {
  constructor() {
    this.notificationContainer = document.querySelector('body #notification');
    this.autohideDuration = 5000;
    this.types = ['info', 'success', 'error', 'warning'];
  }

  cleanNotificationClasses() {
    this.types.map(type => this.notificationContainer.classList.remove(type));
  }

  cleanAfter(ms = 0) {
    setTimeout(() => {
      this.cleanNotificationClasses();
    }, ms);
  }

  info(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('info');
    this.cleanAfter(this.autohideDuration);
  }

  sucess(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('success');
    this.cleanAfter(this.autohideDuration);
  }

  error(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('error');
    this.cleanAfter(this.autohideDuration);
  }

  warning(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('warning');
    this.cleanAfter(this.autohideDuration);
  }
}

const notify = new Notify();
export default notify;
