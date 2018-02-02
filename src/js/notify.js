class Notify {
  constructor() {
    this.notificationContainer = document.querySelector('body #notification');
    this.autohideDuration = 5000;
    this.types = {
      info: 'info',
      success: 'success',
      error: 'error',
      warning: 'warning',
    };
    this.timer;
  }

  _cleanNotificationClasses() {
    Object.keys(this.types).map(type => this.notificationContainer.classList.remove(type));
  }

  _removeAfter(ms = this.autohideDuration) {
    this.timer = setTimeout(() => {
      this._cleanNotificationClasses();
    }, ms);
  }

  _clearTimeouts() {
    clearTimeout(this.timer);
  }

  _showNotification(message, type) {
    this._cleanNotificationClasses();
    this.notificationContainer.innerHTML = message;
    this._clearTimeouts();
    this.notificationContainer.classList.add(type);
    this._removeAfter();
  }

  info(message) {
    this._showNotification(message, this.types.info);
  }

  sucess(message) {
    this._showNotification(message, this.types.success);
  }

  error(message) {
    this._showNotification(message, this.types.error);
  }

  warning(message) {
    this._showNotification(message, this.types.warning);
  }
}

const notify = new Notify();
export default notify;
