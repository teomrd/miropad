import IPFS from "ipfs";
import { url } from "./urlManager";
import CID from "cids";
import notify from "../components/molecules/notify";
import { copyToClipboard } from "./copyToClipboard";
import select from "./dom";

export const retrieveFromIPFS = async (cid) => {
  try {
    const ipfsNode = await IPFS.create();
    const retrievedValueFromIPFS = await ipfs.getFileContents(ipfsNode, cid);
    select(".terminal").setValue(retrievedValueFromIPFS);
    notify.success("IPFS note retrieved!");
  } catch (error) {
    notify.error(`IPFS Error ${error.message}`);
  }
};

const ipfs = {
  isValidCid(hash) {
    try {
      new CID(hash); // eslint-disable-line no-new
      return true;
    } catch (e) {
      return false;
    }
  },
  getFileContents: async function (ipfsNode, cid) {
    try {
      const file = await ipfsNode.cat(cid);
      return Promise.resolve(file.toString("utf8"));
    } catch (error) {
      notify.error(`The requested CID: ${cid} was not found`);
      return Promise.reject(new Error("Not valid CID"));
    }
  },
  save: async function (value) {
    try {
      const ipfs = await IPFS.create();
      const content = IPFS.Buffer.from(value);
      const results = await ipfs.add(content);
      const hash = results[0].hash;
      copyToClipboard(
        `${url.baseUrl}#${hash}`,
        "👌 Note saved. IPFS Link copied to clipboard!"
      );
    } catch (e) {
      notify.error(`😱 Something went wrong while trying to save to IPFS ${e}`); // eslint-disable-line
    }
  },
};

export default ipfs;
