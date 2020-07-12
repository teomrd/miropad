import notify from "../components/molecules/notify";
import { getNote } from "../components/organisms/noteManager/noteManager";
import { url } from "./urlManager";

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
