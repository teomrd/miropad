import { CID } from 'multiformats/cid';
import * as json from 'multiformats/codecs/json';
import { sha256 } from 'multiformats/hashes/sha2';

const hashBrowser = async (val: string) => {
  const bytes = json.encode(val);

  const hash = await sha256.digest(bytes);
  const cid = CID.create(1, json.code, hash);

  return cid.toString();
};

export default hashBrowser;
