import { isElement } from '../../../utils/dom';

export const command = (
  { title, secondary, onclick, onSecondaryClick, icon },
  selected = false,
) => {
  const li = document.createElement('LI');
  li.className = selected ? 'selected' : '';
  if (icon) {
    const iconClone = icon.cloneNode(true);
    li.appendChild(iconClone);
  }
  const liContent = isElement(title) ? title : document.createTextNode(title);
  liContent.onclick = onclick;
  li.appendChild(liContent);

  const span = document.createElement('span');
  if (secondary) {
    span.className = 'secondary';
    const secondaryElement = isElement(secondary)
      ? secondary
      : document.createTextNode(secondary);
    secondaryElement.onclick = onSecondaryClick;
    span.appendChild(secondaryElement);
  }
  li.appendChild(span);

  return li;
};
