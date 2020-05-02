export const button = (text = "Button", fn) => {
  const button = document.createElement("button");
  button.appendChild(text);
  button.onclick = (e) => fn(e);

  return button;
};
