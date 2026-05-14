import storage from "./localstorage.ts";

export const isUserLoggedIn = () => {
  return !!storage.get("authToken");
};
