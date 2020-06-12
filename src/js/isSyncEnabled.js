import storage from "./utils/localstorage";

export const isSyncEnabled = () => {
  const { authToken, gistId } = storage.get(["authToken", "gistId"]);
  return !!(authToken && gistId);
};
