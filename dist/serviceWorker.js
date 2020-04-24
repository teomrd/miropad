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
      console.log("version", version.trim()); // eslint-disable-line
      console.log("currentVersion", currentVersion); // eslint-disable-line
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

// checkForNewerVersion();

// self.addEventListener("message", (event) => {
//   console.log(event.data); // outputs {'hello':'world'}
// });

self.addEventListener("install", () => {
  const currentVersion = new URL(location).searchParams.get("v");
  checkForNewerVersion(currentVersion.trim());
});
