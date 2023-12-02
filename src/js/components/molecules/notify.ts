import select from "../../utils/dom";

const notificationTypes = {
  info: "info",
  success: "success",
  error: "error",
  warning: "warning",
} as const;

type NotificationType = keyof typeof notificationTypes;

const notificationDom = select("#notification");
const cleanNotificationClasses = () =>
  notificationDom.removeClasses(Object.values(notificationTypes));
notificationDom.el.onclick = () => cleanNotificationClasses();

type NotificationFactoryProduct = {
  [key in NotificationType]: (message: string) => void;
};

const notificationFactory = (): NotificationFactoryProduct =>
  Object.values(notificationTypes).reduce(
    (acc, notificationType) => ({
      ...acc,
      [notificationType](message: string) {
        this.showNotification(message, notificationType);
      },
    }),
    {} as NotificationFactoryProduct
  );

type Notification = {
  autohideDuration: number;
  timer: number | undefined;
  removeAfter: () => void;
  showNotification: (message: string, type: NotificationType) => void;
} & NotificationFactoryProduct;

const notification = (autohideDuration = 5): Notification => ({
  autohideDuration,
  timer: undefined,
  removeAfter() {
    this.timer = setTimeout(() => {
      cleanNotificationClasses();
    }, this.autohideDuration * 1000);
  },
  showNotification(message: string, type = notificationTypes.info) {
    cleanNotificationClasses();
    notificationDom.innerHTML(message).addClass(type);
    clearTimeout(this.timer);
    this.removeAfter();
  },
  ...notificationFactory(),
});

const notify = notification();
export default notify;
