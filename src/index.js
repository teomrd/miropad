import main from "./js/main";
import { registerServiceWorker } from "./js/registerServiceWorker";
import {
  syncNotesWithGitHub,
  setAuthTokenFromCallback,
} from "./js/utils/github";

(async () => {
  console.log("VERSION: ", VERSION);
  main();
  registerServiceWorker();

  await syncNotesWithGitHub();
  await setAuthTokenFromCallback();
})();
