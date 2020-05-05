export const icon = (svgIcon) => {
  const image = document.createElement("IMG");
  image.setAttribute("src", svgIcon);
  return image;
}