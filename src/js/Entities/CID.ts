import { CID as CoreCID } from "multiformats/cid";

export const CID = (() => {
  return {
    toString: function (cid: CoreCID): string {
      return cid.toV1().toString();
    },
    fromString: function (cid: string): CoreCID {
      return CoreCID.parse(cid);
    },
  };
})();
