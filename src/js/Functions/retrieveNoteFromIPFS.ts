import select from "../utils/dom";
import { ipfs } from "../repositories/ipfs";
import { setSavedState } from "../ui/functions/savedState";

export const retrieveNoteFromIPFS = async (cid: string) => {
  select(".anchor").show();

  select("#logo").addClass("loading");
  const remoteNote = await ipfs.retrieve(cid);
  select("#logo").removeClass("loading");

  setSavedState(false);
  select(".terminal").setValue(remoteNote);
};
