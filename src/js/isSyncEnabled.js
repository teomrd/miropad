import storage from "./utils/localstorage.ts";

export const isSyncEnabled = () => {
  const { authToken, gistId } = storage.getKeys(["authTaken", "gistId"]);
  return !!(authToken && gistId);
};
