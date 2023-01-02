/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([{"revision":"6b352c8234986802e30f57b4a173db65","url":"bug-36UGMUXT.svg"},{"revision":"715ea2f9ed9c32e912d10f1f8cfd1333","url":"checkmark-circle-JQ7ADSUI.svg"},{"revision":"642881591601125261f78f3ad5a52c32","url":"cloud-sync-F3RLGHML.svg"},{"revision":"f8fc1cc37e1226392cc0cc4c6068cf66","url":"download-FVXMIYZ4.svg"},{"revision":"9c2e1d19ec4949a1cab62aa4f3dcf4ec","url":"earth-DJLABK7O.svg"},{"revision":"08cc87504b693a32d717aaaf13e414a0","url":"enter-down-6TVO6OFR.svg"},{"revision":"a69f752fafc2a5f161dbc1c851d4f17b","url":"envelope-Z2VRVSLR.svg"},{"revision":"7665092453f7b45c2782db5f16e6ce5c","url":"exit-up-GH6BPN2X.svg"},{"revision":"7cdfed241e2edb7e7ed37eaaf9bae94a","url":"favicon.ico"},{"revision":"fd02fe115943662aa6a6581ab31ce38d","url":"frame-expand-CX6CNP53.svg"},{"revision":"59b2a5f4e0884d7c2d4e2324e3727ecc","url":"images/icons/icon-128x128.png"},{"revision":"77b08750ba54d3a8f21f331d04530637","url":"images/icons/icon-144x144.png"},{"revision":"84cb614c066d965f784c2ed810dc31e1","url":"images/icons/icon-152x152.png"},{"revision":"2f95a518fbfc169e32fd5fb7a5b063fd","url":"images/icons/icon-192x192.png"},{"revision":"87029203db3903aab4be829b030b3514","url":"images/icons/icon-384x384.png"},{"revision":"ad2869f40002d4f268f6b60a0c115136","url":"images/icons/icon-512x512.png"},{"revision":"e70a2704695d7026ab6fe403f4604867","url":"images/icons/icon-72x72.png"},{"revision":"0bfc17b6ea552774646836236d7e5954","url":"images/icons/icon-96x96.png"},{"revision":"79e59607337b1e6a34e0935965ad4d21","url":"images/icons/maskable_icon.png"},{"revision":"ce9a2fd61cb2f8c25e2a20ffceb432d1","url":"index.html"},{"revision":"8c304af8b8fb21e361ece9115c88e9a8","url":"index.js"},{"revision":"3ce2509712df0cd63aa28b3bedf3ffe6","url":"leaf-CGBE7XAJ.svg"},{"revision":"4e1ab5abca803d8371db0bac365fdf93","url":"lighter-UBEI67LL.svg"},{"revision":"2694687077344bc31a1968ce3329660b","url":"list-LK7OCHR7.svg"},{"revision":"b399e36fdd1b4597c9c5036c6a4869f8","url":"magic-wand-JQJ6EKRO.svg"},{"revision":"7b5abf852202f8a8ceea367c80e2d993","url":"manifest.json"},{"revision":"126653c706df1e5655be880ddc02e164","url":"page-break-BLVP5QBQ.svg"},{"revision":"d26a9edb2928bbeba1749f454aab95d3","url":"pencil-X3ZMY3QU.svg"},{"revision":"1c74f8e5f212764756b46b728d31a97f","url":"picture-3TDOSVS3.svg"},{"revision":"299ddb01bcee73f853049f4ca36e9dc8","url":"printer-B7RMPYZC.svg"},{"revision":"1eccb57fd8613bb74b8394400b7b1b1f","url":"rocket-AIY2RJJS.svg"},{"revision":"41be43627587fa71a315c9a1d2565283","url":"spell-check-V6QYTGNT.svg"},{"revision":"abef7b4a2eb95c594f45063c3fe372eb","url":"trash-RDL437QG.svg"}]);

const checkForNewerVersion = (currentVersion) => {
  const intervalChecker = setInterval(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/teomrd/miropad/gh-pages/version",
        {
          cache: "no-cache",
        }
      );
      const version = await res.text();
      if (currentVersion !== version.trim()) {
        self.registration.showNotification("✍️ MiroPad has been updated", {
          body: `Version ${version} is available, refresh to update!`,
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
