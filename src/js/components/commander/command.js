export const command = ({ title, secondary, onclick }, selected = false) => {
  const li = document.createElement("LI");
  li.className = selected ? "selected" : "";
  li.onclick = onclick;
  const commandContainer = document.createElement("div");
  commandContainer.appendChild(document.createTextNode(title));
  li.appendChild(commandContainer);
  const span = document.createElement("span");
  if (secondary) {
    span.className = "secondary";
    span.appendChild(document.createTextNode(`${secondary}`));
  }
  li.appendChild(span);

  return li;
};
