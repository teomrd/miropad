import select from "../../../utils/dom.js";

// This is a feature where you can easily tick on/off
// checkboxes ✅ on the Markdown preview.
// It does NOT persist the state on the data layer,
// but lives temporarily on the browser's state
// Useful feature when you are going to the Super market 😄

export const autoMagicallyCheckBoxes = () => {
  select(".task-list-item").listenAll("click", (el) => {
    el.firstChild.checked = !el.firstChild.checked;
  });
};
