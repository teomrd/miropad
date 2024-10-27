import select from "../../utils/dom.js";

export const setSavedState = (saved = true) => {
  if (saved) {
    select("#save").removeClass("unsaved");
    select("#logo").removeClass("unsaved");
  } else {
    select("#save").addClass("unsaved");
    select("#logo").addClass("unsaved");
  }
};
