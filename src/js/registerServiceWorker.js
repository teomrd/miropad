import storage from "./utils/localstorage";

export const requestNotificationPermission = async () => {
  if (!storage.get("__notification-permission__")) {
    const permission = await window.Notification.requestPermission();
    storage.set("__notification-permission__", permission);
  }
};

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(
      `${window.location.pathname}service-worker.js?v=${VERSION}`
    );
  }
};
