export const button = (text = "Button", fn) => {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.onclick = (e) => fn(e);

  return button;
};
