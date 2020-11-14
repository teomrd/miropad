import CID from "cids";
import multihashing from "multihashing-async";

const hashBrowser = async (val) => {
  const bytes = new TextEncoder("utf8").encode(val);
  const hash = await multihashing(bytes, "sha2-256");
  const cid = new CID(1, "dag-pb", hash);

  return cid.toString();
};

export default hashBrowser;
