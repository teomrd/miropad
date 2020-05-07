import { isArray } from '../../../utils/isArray';

const isAppendable = (el) => {
  try {
    document.createElement("div").appendChild(el);
    return true;
  } catch (error) {
    console.log({'error': error});
    return false;
  }
}


export const button = (els, fn) => {
  const elements = isArray(els) ? els : [els]
  const button = document.createElement("button");
  elements.forEach(element => {
    if(isAppendable(element)) {
      button.appendChild(element);
    }
  });
  button.onclick = (e) => fn(e);

  return button;
};
