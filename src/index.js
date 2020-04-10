import main from "./js/main";
import { registerServiceWorker } from "./js/registerServiceWorker";
import { url } from "./js/utils/urlManager";
import notify from "./js/notify";
import { getAuthToken, getAuthenticatedUsersGists } from "./js/utils/githubAPI";

(async () => {
  console.log("VERSION: ", VERSION);
  main();
  registerServiceWorker();

  try {
    const code = url.getSearchParam("code");
    const state = url.getSearchParam("state");

    const authToken = await getAuthToken(code, state);
    console.log("authToken", authToken);
    notify.success("party 🥳");

    const { token } = authToken;
    const myGists = await getAuthenticatedUsersGists(token);
    console.log("myGists", myGists);

    // console.log("response", await response.json());
  } catch (error) {
    console.log("error", error);
    notify.error(error.message);
  }
})();
