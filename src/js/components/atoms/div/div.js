import { isElement } from "../../../utils/dom";

export const div = (content = "") => {
  const elementsToAdd = typeof content === "string" ? [content] : content;

  const div = document.createElement("div");
  elementsToAdd.forEach((el) => {
    const newContent = isElement(el) ? el : document.createTextNode(el);
    div.appendChild(newContent);
  });

  return div;
};
