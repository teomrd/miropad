import select from '../../utils/dom.js';

type NotificationType = 'info' | 'success' | 'error' | 'warning';

const notificationTypes: Record<NotificationType, NotificationType> = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
};

const notification = select('#notification');

const cleanNotificationClasses = (): void => {
  notification.removeClasses(Object.values(notificationTypes));
};

notification.el.onclick = () => cleanNotificationClasses();

const notificationFactory = () =>
  Object.values(notificationTypes).reduce(
    (acc, notificationType) => ({
      ...acc,
      [notificationType](message: string): void {
        // @ts-ignore fix later
        this.showNotification(message, notificationType);
      },
    }),
    {} as Record<NotificationType, (message: string) => void>,
  );

interface Notification {
  autohideDuration: number;
  timer?: number;
  removeAfter(): void;
  showNotification(message: string, type?: NotificationType): void;
  info(message: string): void;
  success(message: string): void;
  error(message: string): void;
  warning(message: string): void;
}

const Notification = (autohideDuration = 5): Notification => ({
  autohideDuration,
  timer: undefined,
  removeAfter() {
    this.timer = self.setTimeout(() => {
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
