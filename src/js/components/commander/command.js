import { isElement } from "../../utils/dom";

export const command = ({ title, secondary, onclick }, selected = false) => {
  const li = document.createElement("LI");
  li.className = selected ? "selected" : "";
  li.onclick = onclick;
  li.appendChild(isElement(title) ? title : document.createTextNode(title));
  const span = document.createElement("span");
  if (secondary) {
    span.className = "secondary";
    span.appendChild(document.createTextNode(`${secondary}`));
  }
  li.appendChild(span);

  return li;
};
