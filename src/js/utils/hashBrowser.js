/* globals Buffer */
import CID from "cids";
import multihashing from "multihashing-async";

const hashBrowser = async (val) => {
  const hash = await multihashing(Buffer.from(val), "sha2-256");
  const cid = new CID(1, "dag-pb", hash);
  return cid.toString();
};

export default hashBrowser;
