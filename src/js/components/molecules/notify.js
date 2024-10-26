import select from '../../utils/dom';

const notificationTypes = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
};

const notification = select('#notification');
const cleanNotificationClasses = () =>
  notification.removeClasses(Object.values(notificationTypes));
notification.el.onclick = () => cleanNotificationClasses();

const notificationFactory = () =>
  Object.values(notificationTypes).reduce(
    (acc, notificationType) => ({
      ...acc,
      [notificationType](message) {
        this.showNotification(message, notificationType);
      },
    }),
    {},
  );

const Notification = (autohideDuration = 5) => ({
  autohideDuration,
  timer: undefined,
  removeAfter() {
    this.timer = setTimeout(() => {
      cleanNotificationClasses();
    }, this.autohideDuration * 1000);
  },
  showNotification(message, type = notificationTypes.info) {
    cleanNotificationClasses();
    notification.innerHTML(message).addClass(type);
    clearTimeout(this.timer);
    this.removeAfter();
  },
  ...notificationFactory(),
});

const notify = Notification();
export default notify;
