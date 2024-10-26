import { isArray } from '../../../utils/isArray';

export const button = (els, fn, id) => {
  const elements = isArray(els) ? els : [els];
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  if (id) {
    button.setAttribute('id', id);
  }
  elements.forEach((element) => {
    if (typeof element === 'string') {
      button.appendChild(document.createTextNode(element));
    } else {
      button.appendChild(element);
    }
  });
  button.onclick = (e) => fn(e);

  return button;
};
