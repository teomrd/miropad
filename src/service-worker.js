/* eslint-disable no-undef */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute(self.__WB_MANIFEST);

const checkForNewerVersion = (currentVersion) => {
  const intervalChecker = setInterval(async () => {
    try {
      const res = await fetch(
        'https://raw.githubusercontent.com/teomrd/miropad/gh-pages/version',
        {
          cache: 'no-cache',
        },
      );
      const version = await res.text();
      if (currentVersion !== version.trim()) {
        self.registration.showNotification('✍️ MiroPad has been updated', {
          body: `Version ${version} is available, refresh to update!`,
        });
        clearInterval(intervalChecker);
      }
    } catch (error) {
      self.registration.showNotification('✍️ MiroPad Error', {
        body: error.message,
      });
    }
  }, 5000);
};

self.addEventListener('install', () => {
  const currentVersion = new URL(location).searchParams.get('v');
  checkForNewerVersion(currentVersion.trim());
});
