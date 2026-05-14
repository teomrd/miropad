export const isArray = (what: unknown): what is unknown[] =>
  Array.isArray(what);
