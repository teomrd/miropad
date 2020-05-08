import { isArray } from '../../../utils/isArray';

export const button = (els, fn) => {
  const elements = isArray(els) ? els : [els]
  const button = document.createElement("button");
  elements.forEach(element => {
    if(typeof element === 'string') {
      button.appendChild(document.createTextNode(element));
    } else {
      button.appendChild(element);
    } 
  });
  button.onclick = (e) => fn(e);

  return button;
};
