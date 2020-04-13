import { getNote, getNotes } from "../components/noteManager/noteManager";

const search = (q) => {
  if (!q) {
    return undefined;
  }

  const results = getNotes()
    .map(({ id }) => getNote(id))
    .filter(({ text }) => text.toLowerCase().includes(q.toLowerCase()));

  return results[0];
};

export default search;
