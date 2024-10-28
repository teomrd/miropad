import { isElement } from '../../../utils/dom.js';

export const link = (textOrNode, url) => {
  const a = document.createElement('a');
  a.href = url;
  a.appendChild(
    isElement(textOrNode) ? textOrNode : document.createTextNode(textOrNode),
  );
  return a;
};
