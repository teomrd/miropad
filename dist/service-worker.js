/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
const { precacheAndRoute } = workbox.precaching;

precacheAndRoute([{"revision":"a69f752fafc2a5f161dbc1c851d4f17b","url":"0996012722226f7380a9e2c486b3e8e8.svg"},{"revision":"92334be801637d03f6d11cd7ac76b564","url":"0e38ad63a876756b0ef347100f5494c9.svg"},{"revision":"642881591601125261f78f3ad5a52c32","url":"1474c04b6cf11f1ebaee773127b3fbee.svg"},{"revision":"7b5b191c36d9d1033ae720febcbd94a0","url":"175c3b43f0ecfe155236689749515db7.svg"},{"revision":"a6bc5953be19a8c4b2f1d2c4111915c5","url":"1c2fd3127526dd4ad81eb4e62cef553e.svg"},{"revision":"41be43627587fa71a315c9a1d2565283","url":"1cf7b95b90b67c0c8757b511917a9094.svg"},{"revision":"ffe6efd74383f1a505aac1508176746f","url":"2228d56d2bc392599db349041bf21241.svg"},{"revision":"ab9327fe7e45e94712209f56cf348160","url":"25d35621ccfc24e741a51c80d966eaf7.svg"},{"revision":"9d728a605d647075a57d0e198abc9e34","url":"2639580d2abbcc6644b3359281aa3333.svg"},{"revision":"b29d042d1df876993452526c0ce809ff","url":"3703276e4a7a172a0c0b3efcbfa88e7a.svg"},{"revision":"e33e3c6aacf826ce13e1edf82b3829ad","url":"3f7996eecd157f236906d04c1e79d8b0.svg"},{"revision":"f8fc1cc37e1226392cc0cc4c6068cf66","url":"43d84888bd092265756f626eec18683e.svg"},{"revision":"126653c706df1e5655be880ddc02e164","url":"45c483b24c7d633ec4f3a1957ca6a1f3.svg"},{"revision":"14cce46aa26147e727063410f77d1a6b","url":"49128cb76da8b188d05aea4fc17f0e70.svg"},{"revision":"2694687077344bc31a1968ce3329660b","url":"4a67b5407e5b2e50f3d387be879212f2.svg"},{"revision":"8c261256563449e065da30a89b5b6cf7","url":"5ab67154dade4d17ae2f74a34b4b07ac.svg"},{"revision":"abef7b4a2eb95c594f45063c3fe372eb","url":"653f096146f8e8fa5c4300c20f1a3919.svg"},{"revision":"109f8b1a76a6766ac2fd1fe6887ec4b7","url":"663024d37be7fc94c5840721ab3fbbb9.svg"},{"revision":"ae402f88be1d567122215e9fc3a9fb9b","url":"6af86e731ccc374f8d7e1446075bbbc0.svg"},{"revision":"9673dacefb96ad3b5b53938c6e4b96cf","url":"768805e5c0fae8ca7b0ccdd4a3252d44.svg"},{"revision":"08cc87504b693a32d717aaaf13e414a0","url":"7f85e17a9c1e74fb7dfc91fafad96b45.svg"},{"revision":"715ea2f9ed9c32e912d10f1f8cfd1333","url":"8ad0673131c02cc33db0bf297177a27e.svg"},{"revision":"dd31ebfef8228956a140e614ae2cbb92","url":"8bd1cd0dabf4a8fc6cbed8d73f5f0b26.svg"},{"revision":"299ddb01bcee73f853049f4ca36e9dc8","url":"933e99a31689bc8c156b4e3a900f0cd6.svg"},{"revision":"1c74f8e5f212764756b46b728d31a97f","url":"9b6b1038afbbfb7751430ad9ae3d9cd6.svg"},{"revision":"0d7ec44ef37e0b7fd82f582e746108a7","url":"9ecb2a2db46ae5ac7431343176c1e1b9.svg"},{"revision":"b399e36fdd1b4597c9c5036c6a4869f8","url":"a02a8db81c862fbcb3b4071105c7b104.svg"},{"revision":"630d4464058f6638c04c5a4b856ec1ef","url":"ae9e421a5b05957a605ea9d47bea295d.svg"},{"revision":"0d04bc18a862853864f276c0ca8c260f","url":"b8b4bdf8affc22df7d2c289176986ade.svg"},{"revision":"4e1ab5abca803d8371db0bac365fdf93","url":"ba6e9ad7a7ce64fd8cedcb6f33255707.svg"},{"revision":"1eccb57fd8613bb74b8394400b7b1b1f","url":"bd70845f8334ae5f31e17525d5b05ed0.svg"},{"revision":"a1af20c11849785c2edca445336f0577","url":"eccc0f9618165b8f4b818dbbe7591ec4.svg"},{"revision":"fd02fe115943662aa6a6581ab31ce38d","url":"edcc866ae509343cd94e47181c7238ac.svg"},{"revision":"a40b59a98e362e0b2685c616c6a09b40","url":"f6989f639b080973f4007317501dc5cb.svg"},{"revision":"7cdfed241e2edb7e7ed37eaaf9bae94a","url":"favicon.ico"},{"revision":"59b2a5f4e0884d7c2d4e2324e3727ecc","url":"images/icons/icon-128x128.png"},{"revision":"77b08750ba54d3a8f21f331d04530637","url":"images/icons/icon-144x144.png"},{"revision":"84cb614c066d965f784c2ed810dc31e1","url":"images/icons/icon-152x152.png"},{"revision":"2f95a518fbfc169e32fd5fb7a5b063fd","url":"images/icons/icon-192x192.png"},{"revision":"87029203db3903aab4be829b030b3514","url":"images/icons/icon-384x384.png"},{"revision":"ad2869f40002d4f268f6b60a0c115136","url":"images/icons/icon-512x512.png"},{"revision":"e70a2704695d7026ab6fe403f4604867","url":"images/icons/icon-72x72.png"},{"revision":"0bfc17b6ea552774646836236d7e5954","url":"images/icons/icon-96x96.png"},{"revision":"41fc6a53b6760c4c4c5e18935bec8d3f","url":"index.html"},{"revision":"f22a3b300f59515f47ace6c9eb63b4d3","url":"main.js"},{"revision":"1902079dc63081da4f976d545c3d896e","url":"manifest.json"}]);

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
