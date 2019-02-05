const search = q => {
  if (q === undefined) {
    return undefined;
  }
  const items = { ...localStorage };
  const result = Object.values(items).filter(val =>
    val.toLowerCase().includes(q.toLowerCase())
  );
  return result[0];
};

export default search;
