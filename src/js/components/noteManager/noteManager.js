/* eslint-disable indent */
import storage from "../../utils/localstorage";
import select from "../../utils/dom";
import { setPageTitle, resetPageTitle } from "../../utils/pageTitle";

export const getCurrentNote = () => {
  const hash = window.location.hash.substr(1);
  const hashWithVersion = hash.split("?");
  const title = hashWithVersion[0] || null;

  const doc = JSON.parse(storage.getLocalValue(title));

  const newerNote = doc
    ? Object.values(doc.revisions).reduce(
        (acc, note) => (note.dateCreated > acc.dateCreated ? note : acc),
        { dateCreated: 0 }
      )
    : {};

  return title
    ? {
        ...doc,
        titleId: doc.title,
        ...newerNote,
        numberOfRevisions: doc.revisions
          ? Object.keys(doc.revisions).length
          : undefined,
        title: decodeURIComponent(title)
      }
    : null;
};

export const setNoteFromHash = () => {
  const note = getCurrentNote();
  if (note) {
    select("#revisions").html(
      `${note.numberOfRevisions} revision${
        note.numberOfRevisions > 1 ? "s" : ""
      }`
    );
    setPageTitle(note.title);
    select(".terminal").setValue(note.text);
  } else {
    select(".terminal").setValue("");
  }
};

export const resetNoteManager = () => {
  location.hash = "";
  resetPageTitle();
  select("#revisions").html("");
  select(".logo").removeClass("unsaved");
};
