import { getGist, getAuthToken } from "../github/api";
import { updateNote } from "../../components/noteManager/noteManager";
import notify from "../../notify";
import storage from "../localstorage";
import { url } from "../urlManager";
import commander, {
  commanderModes
} from "../../components/commander/commander";
import { getAuthenticatedUsersGists, createNewGist, updateGist } from "./api";
import { commands } from "../../components/commander/commands";
import select from "../dom";
import { configuration } from "../../../configuration";

export const goAuthenticate = async () => {
  notify.info("You need to be authenticated!");
  commander.hide();
  return window.location.replace(
    `https://github.com/login/oauth/authorize?client_id=${configuration.github.client_id}&scope=gist&state=${configuration.github.request_state}`
  );
};

export const setGistToSyncWith = async token => {
  notify.info("Downloading my Gists!");
  const gists = await getAuthenticatedUsersGists(token);
  commander.state.mode = commanderModes.gists;
  notify.info("Select Gist to sync with");
  const gistOptions = gists
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .map(({ description, updated_at, id }) => ({
      title: `${description}(${id})`,
      secondary: updated_at,
      onclick: () => {
        storage.set("gistId", id);
        notify.success(`${description}(${id}) selected for synchronization!`);
        commander.hide();
      }
    }));

  const gistOptionComponents = commands([
    {
      title: "Create a new Gist",
      onclick: async () => {
        notify.info("Syncing your MiroPads to a new Gist");
        try {
          const { id } = await createNewGist();
          storage.set("gistId", id);
          notify.success("MiroPads synced to a new Gist 🎉");
        } catch (error) {
          notify.error(error.message);
        }
        commander.hide();
      }
    },
    ...gistOptions
  ]);
  select("#commands").html("");
  select("#commands").append(gistOptionComponents);
};

export const syncNotesWithGitHub = async (gistId = storage.get("gistId")) => {
  const authToken = storage.get("authToken");
  select("#logo").addClass("loading");
  if (authToken && gistId) {
    const { files, updated_at } = await getGist(gistId);
    const lastRemoteUpdate = new Date(updated_at).getTime();
    const lastLocalUpdate = new Date(storage.get("lastLocalUpdate")).getTime();
    if (lastLocalUpdate > lastRemoteUpdate) {
      await updateGist();
      notify.success("⬆ MiroPad notes synced on Gist ✅");
    } else {
      Object.values(files).forEach(({ content }) => {
        updateNote(content);
      });
      storage.set("lastSync", new Date());
      notify.success("⬇ MiroPad synced ✅");
    }
    select("#logo").removeClass("loading");
  }
};

export const setAuthTokenFromCallback = async () => {
  const code = url.getSearchParam("code");
  const state = url.getSearchParam("state");
  if (code && state) {
    select("#logo").addClass("loading");
    notify.info("🔐 Authenticating...");
    try {
      const { token } = await getAuthToken(code, state);
      storage.set("authToken", token);
      notify.info("⛳ You have been authenticated!");
      url.deleteParam(["code", "state"]);
    } catch (error) {
      console.log("error", error);
      notify.error(error.message);
    }
    select("#logo").removeClass("loading");
  }
};
