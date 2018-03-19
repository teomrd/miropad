import select from './utils/dom';

const notificationTypes = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
};

const notification = select('#notification');
const cleanNotificationClasses = () => {
  const classes = Object.values(notificationTypes);
  notification.removeClasses(classes);
};
notification.el.onclick = () => cleanNotificationClasses();

const Notification = ({ autohideDuration = 5 } = {}) => ({
  autohideDuration,
  timer: undefined,
  removeAfter() {
    this.timer = setTimeout(() => {
      cleanNotificationClasses();
    }, this.autohideDuration * 1000);
  },
  showNotification(message, type) {
    cleanNotificationClasses();
    notification.html(message).addClass(type);
    clearTimeout(this.timer);
    this.removeAfter();
  },
  sucess(message) {
    this.showNotification(message, notificationTypes.success);
  },
  info(message) {
    this.showNotification(message, notificationTypes.info);
  },
  error(message) {
    this.showNotification(message, notificationTypes.error);
  },
  warning(message) {
    this.showNotification(message, notificationTypes.warning);
  },
});

const notify = Notification();

export default notify;
