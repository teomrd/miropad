import select from './utils/dom';
/* eslint-disable */
const notification = select('#notification');
const notificationTypes = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
};
class Notify {
  constructor() {
    this.defaultAutohideDuration = 5;
    this.autohideDuration = 5;
    this.timer;
    notification.el.onclick = () => {
      this._cleanNotificationClasses();
    };
  }

  _removeAfter() {
    this.timer = setTimeout(() => {
      this._cleanNotificationClasses();
    }, this.autohideDuration * 1000);
  }

  _clearTimeouts() {
    clearTimeout(this.timer);
  }

  _cleanNotificationClasses() {
    Object.values(notificationTypes).map(type => notification.removeClass(type));
  }

  _showNotification(message, type) {
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
