import { isElement } from '../../../utils/dom';
export const link = (textOrNode, url) => {
  const a = document.createElement('a');
  a.href = url;
  a.appendChild(
    isElement(textOrNode) ? textOrNode : document.createTextNode(textOrNode),
  );
  return a;
};
