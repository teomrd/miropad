import isJSON from "./isJSON.ts";
import notify from "../components/molecules/notify.ts";

const prettifyJSON = (selector) => {
  const el = document.querySelector(selector);
  if (isJSON(el.value)) {
    const prettifiedJSON = JSON.stringify(JSON.parse(el.value), null, 2);
    el.value = prettifiedJSON;
    notify.success("👍 JSON value prettified");
  } else {
    notify.error("😧 Value is not in valid JSON format");
  }
};

export default prettifyJSON;
