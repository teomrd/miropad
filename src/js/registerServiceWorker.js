export const requestNotificationPermission = () => {
  return globalThis.Notification.requestPermission();
};

export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(
      `${
        globalThis.location.pathname.slice(-1) === "/"
          ? globalThis.location.pathname
          : `${globalThis.location.origin}/`
      }service-worker.js?v=${VERSION}`,
    );
  }
};
