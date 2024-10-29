import notify from "../components/molecules/notify.ts";
import { getNote } from "../components/organisms/noteManager/noteManager.ts";
import { url } from "./urlManager.js";

export const share = async () => {
  try {
    const note = getNote();
    const currentUrl = url.get();
    await navigator.share({
      title: note ? note.title : TITLE_NAME,
      text: note ? note.text : "Temporary note keeping app for the browser",
      url: currentUrl,
    });
  } catch (error) {
    notify.info(`${error.message}`);
  }
};
