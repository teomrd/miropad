import notify from "../notify";
import CID from "cids";

const ipfs = {
  isValidCid(hash) {
    try {
      new CID(hash); // eslint-disable-line no-new
      return true;
    } catch (e) {
      return false;
    }
  },
  getFileContents: async function(ipfsNode, cid) {
    try {
      const file = await ipfsNode.cat(cid);
      return Promise.resolve(file.toString("utf8"));
    } catch (error) {
      notify.error(`The requested CID: ${cid} was not found`);
      return Promise.reject(new Error("Not valid CID"));
    }
  }
};

export default ipfs;
