class Notify {
  constructor() {
    this.notificationContainer = document.querySelector('body #notification');
    this.defaultAutohideDuration = 5;
    this.autohideDuration = 5;
    this.types = {
      info: 'info',
      success: 'success',
      error: 'error',
      warning: 'warning',
    };
    this.timer;
    this.notificationContainer.onclick = () => {
      this._cleanNotificationClasses();
    };
  }

  _cleanNotificationClasses() {
    Object.keys(this.types).map(type => this.notificationContainer.classList.remove(type));
  }

  _removeAfter() {
    this.timer = setTimeout(() => {
      this._cleanNotificationClasses();
    }, this.autohideDuration * 1000);
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

  info(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, this.types.info);
  }

  sucess(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, this.types.success);
  }

  error(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, this.types.error);
  }

  warning(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, this.types.warning);
  }
}

const notify = new Notify();
export default notify;
