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
  notification.removeClasses(classes);
};

const Notification = ({ autohideDuration = 5 } = {}) => ({
  autohideDuration,
  timer: undefined,
  _removeAfter() {
    this.timer = setTimeout(() => {
      cleanNotificationClasses();
    }, this.autohideDuration * 1000);
  },
  _showNotification(message, type) {
    cleanNotificationClasses();
    notification.html(message).addClass(type);
    clearTimeout(this.timer);
    this._removeAfter();
  },
  sucess(message) {
    this._showNotification(message, notificationTypes.success);
  },
  info(message) {
    this._showNotification(message, notificationTypes.info);
  },
  error(message) {
    this._showNotification(message, notificationTypes.error);
  },
  warning(message) {
    this._showNotification(message, notificationTypes.warning);
  },
});

const notify = Notification();

export default notify;
/* eslint-enable */
