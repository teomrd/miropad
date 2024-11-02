const isJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch (_e) {
    return false;
  }
  return true;
};

export default isJSON;
