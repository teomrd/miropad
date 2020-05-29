import notify from "./components/molecules/notify";

export const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") {
    notify.info("Permission not granted for Notifications");
  }
};

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(
      `${window.location.pathname}service-worker.js?v=${VERSION}`
    );
  }
};
