let currentVersion;

const checkForNewerVersion = (currentVersion) => {
  const intervalChecker = setInterval(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/teomrd/miropad/gh-pages/.version",
        {
          cache: "no-cache",
        }
      );
      const { version } = await res.text();
      console.log("version", version);
      console.log("clean version", version.replace("\"", "")); // eslint-disable-line
      console.log("currentVersion", currentVersion);
      if (currentVersion !== version.replace("\"", "")) { // eslint-disable-line
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

checkForNewerVersion();

// self.addEventListener("message", (event) => {
//   console.log(event.data); // outputs {'hello':'world'}
// });

self.addEventListener("install", () => {
  currentVersion = new URL(location).searchParams.get("v");
  console.log("currentVersion is ", currentVersion);
  checkForNewerVersion(currentVersion);
});
