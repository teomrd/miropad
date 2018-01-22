const prettifyJSON = selector => {
  const el = document.querySelector(selector);
  const prettifiedJSON = JSON.stringify(JSON.parse(el.value), null, 2);
  el.value = prettifiedJSON;
};

export default prettifyJSON;
