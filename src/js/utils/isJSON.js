const isJSON = (str) => {
  try {
    JSON.parse(str);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
  return true;
};

export default isJSON;
