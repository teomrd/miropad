import select from "../utils/dom";
import { ipfs } from "../repositories/ipfs";

export const retrieveNoteFromIPFS = async (cid: string) => {
  select(".anchor").show();

  select("#logo").addClass("loading");
  const remoteNote = await ipfs.retrieve(cid);
  select("#logo").removeClass("loading");

  select("#save").addClass("unsaved");
  select("#logo").addClass("unsaved");
  select(".terminal").setValue(remoteNote);
};
