import select from './utils/dom';
/* eslint-disable */
const notificationTypes = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
};
const notification = select('#notification');
notification.el.onclick = () => cleanNotificationClasses();
const cleanNotificationClasses = () => {
  const classes = Object.values(notificationTypes);
  console.log('clases', classes);
  notification.removeClasses(classes);
};
class Notify {
  constructor() {
    this.defaultAutohideDuration = 5;
    this.autohideDuration = 5;
    this.timer;
  }

  _removeAfter() {
    this.timer = setTimeout(() => {
      cleanNotificationClasses();
    }, this.autohideDuration * 1000);
  }

  _clearTimeouts() {
    clearTimeout(this.timer);
  }

  _showNotification(message, type) {
    cleanNotificationClasses();
    notification.html(message).addClass(type);

    this._clearTimeouts();
    this._removeAfter();
  }

  info(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, notificationTypes.info);
  }

  sucess(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, notificationTypes.success);
  }

  error(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, notificationTypes.error);
  }

  warning(message, time = this.defaultAutohideDuration) {
    this.autohideDuration = time;
    this._showNotification(message, notificationTypes.warning);
  }
}

const notify = new Notify();
export default notify;
/* eslint-enable */
