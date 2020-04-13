let currentVersion;

const checkForNewerVersion = (currentVersion) => {
  const intervalChecker = setInterval(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/teomrd/miropad/master/package.json",
        {
          cache: "no-cache",
        }
      );
      const { version } = await res.json();
      if (currentVersion !== version) {
        self.registration.showNotification("✍️ MiroPad has been updated", {
          body: `Version ${version} is available, refresh to update!`,
        });
        clearInterval(intervalChecker);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, 5000);
};

// self.addEventListener("message", event => {
//   console.log(event.data); // outputs {'hello':'world'}
// });

self.addEventListener("install", () => {
  currentVersion = new URL(location).searchParams.get("v");
  console.log("currentVersion is ", currentVersion);
  checkForNewerVersion(currentVersion);
});
