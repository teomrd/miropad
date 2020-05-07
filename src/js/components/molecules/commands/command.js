import { isElement } from "../../../utils/dom";

export const command = ({ title, secondary, onclick, icon }, selected = false) => {
  const li = document.createElement("LI");
  li.className = selected ? "selected" : "";
  li.onclick = onclick;
  if (icon) {
    const iconClone = icon.cloneNode(true);
    li.appendChild(iconClone);
  }
  li.appendChild(isElement(title) ? title : document.createTextNode(title));
  const span = document.createElement("span");
  if (secondary) {
    span.className = "secondary";
    span.appendChild(document.createTextNode(`${secondary}`));
  }
  li.appendChild(span);

  return li;
};
