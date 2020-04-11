import main from "./js/main";
import { registerServiceWorker } from "./js/registerServiceWorker";
import { url } from "./js/utils/urlManager";
import notify from "./js/notify";
import { getAuthToken } from "./js/utils/githubAPI";
import storage from "./js/utils/localstorage";

(async () => {
  console.log("VERSION: ", VERSION);
  main();
  registerServiceWorker();

  try {
    const code = url.getSearchParam("code");
    const state = url.getSearchParam("state");

    if (code && state) {
      const { token } = await getAuthToken(code, state);
      console.log("authToken", token);
      storage.set("authToken", token);
      notify.info("⛳ You have been authenticated!");
      url.deleteParam(["code", "state"]);
    }
  } catch (error) {
    console.log("error", error);
    notify.error(error.message);
  }
})();
