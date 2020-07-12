import notify from "../components/molecules/notify";
import { getNote } from "../components/organisms/noteManager/noteManager";
import { url } from "./urlManager";

export const share = async () => {
  try {
    const { title, text } = getNote();
    const currentUrl = url.get();
    await navigator.share({
      title,
      text,
      url: currentUrl,
    });
  } catch (error) {
    notify.error(`Error sharing: ${error.message}`);
  }
};
