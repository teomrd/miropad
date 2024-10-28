import storage from './utils/localstorage.js';

export const requestNotificationPermission = async () => {
  if (!storage.get('__notification-permission__')) {
    const permission = await globalThis.Notification.requestPermission();
    storage.set('__notification-permission__', permission);
  }
};

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
      `${globalThis.location.pathname}service-worker.js?v=${VERSION}`,
    );
  }
};
