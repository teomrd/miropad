import { base64 } from "multiformats/bases/base64";
import { CID as CoreCID } from "multiformats/cid";

export const CID = (() => {
  return {
    toString: function(cid: CoreCID): string {
      return cid.toV1().toString(base64.encoder);
    },
    fromString: function(cid: string): CoreCID {
      return CoreCID.parse(cid, base64.decoder);
    },
  }
})();