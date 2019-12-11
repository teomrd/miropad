import main from "./js/main";
import { registerServiceWorker } from "./js/registerServiceWorker";

(() => {
  console.log("VERSION ==> ", VERSION);
  main();
  registerServiceWorker();
})();
