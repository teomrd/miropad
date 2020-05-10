export const icon = (svgIcon, className) => {
  const image = document.createElement("IMG");

  if (className) image.classList.add(className);

  image.setAttribute("src", svgIcon);
  return image;
};
