export const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
  // navigator.serviceWorker.controller.postMessage({ hello: "world" });
};

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.register(
      `${window.location.pathname}/serviceWorker.js?v=${VERSION}`
    );
  }
};
