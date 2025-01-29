importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js",
);
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([{"revision":"7cdfed241e2edb7e7ed37eaaf9bae94a","url":"favicon.ico"},{"revision":"b6282f083079caa42571d8976ab941e4","url":"images/icons/apple-icon-180.png"},{"revision":"59b2a5f4e0884d7c2d4e2324e3727ecc","url":"images/icons/icon-128x128.png"},{"revision":"77b08750ba54d3a8f21f331d04530637","url":"images/icons/icon-144x144.png"},{"revision":"84cb614c066d965f784c2ed810dc31e1","url":"images/icons/icon-152x152.png"},{"revision":"2f95a518fbfc169e32fd5fb7a5b063fd","url":"images/icons/icon-192x192.png"},{"revision":"87029203db3903aab4be829b030b3514","url":"images/icons/icon-384x384.png"},{"revision":"ad2869f40002d4f268f6b60a0c115136","url":"images/icons/icon-512x512.png"},{"revision":"e70a2704695d7026ab6fe403f4604867","url":"images/icons/icon-72x72.png"},{"revision":"0bfc17b6ea552774646836236d7e5954","url":"images/icons/icon-96x96.png"},{"revision":"578dee69d9784d1ddccff8a543727bec","url":"images/icons/manifest-icon-192.maskable.png"},{"revision":"e90e83fb498775a8d309c3229ed5c318","url":"images/icons/manifest-icon-512.maskable.png"},{"revision":"79e59607337b1e6a34e0935965ad4d21","url":"images/icons/maskable_icon.png"},{"revision":"97f57b5e52990bf7f288569b47d835b0","url":"images/screenshots/screenshot-1280x720.png"},{"revision":"eee036a57c9667b56f414cfa2e843bd3","url":"images/screenshots/screenshot-375x667.png"},{"revision":"dcc164d70bca2e05f01c326ea1298cd0","url":"index.html"},{"revision":"2c0a2439355a9bb1ca4ea283caf894ed","url":"manifest.json"}]);

const checkForNewerVersion = (currentVersion) => {
  const intervalChecker = setInterval(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/teomrd/miropad/gh-pages/version",
        {
          cache: "no-cache",
        },
      );
      const version = await res.text();
      if (currentVersion !== version.trim()) {
        self.registration.showNotification("✍️ MiroPad has been updated", {
          body: `MiroPad ${version} is available, refresh to update!`,
        });
        clearInterval(intervalChecker);
      }
    } catch (error) {
      self.registration.showNotification("✍️ MiroPad Error", {
        body: error.message,
      });
    }
  }, 5000);
};

self.addEventListener("install", () => {
  const currentVersion = new URL(location).searchParams.get("v");
  checkForNewerVersion(currentVersion.trim());
});
