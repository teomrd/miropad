import main from "./js/main";
import { registerServiceWorker } from "./js/registerServiceWorker";
import {
  updateLocalNotesFromGitHub,
  setAuthTokenFromCallback
} from "./js/utils/github";

(async () => {
  console.log("VERSION: ", VERSION);
  main();
  registerServiceWorker();

  await updateLocalNotesFromGitHub();
  await setAuthTokenFromCallback();
})();
