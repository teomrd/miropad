export const icon = (svgIcon, altText, className) => {
  const image = document.createElement("IMG");

  if (className) image.classList.add(className);
  if (altText) image.setAttribute("alt", altText);
  image.setAttribute("src", svgIcon);
  return image;
};
