export const link = (text, url) => {
  const a = document.createElement("a");
  a.href = url;
  a.appendChild(document.createTextNode(text));
  return a;
};
