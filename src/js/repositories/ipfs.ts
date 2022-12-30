import { create } from "ipfs-core";
import { CID } from "../Entities/CID";
import type { IPFS } from "ipfs-core-types";

export const ipfs = (() => {
  let ipfs: IPFS;

  return {
    init: async () => {
      if (!ipfs) {
        ipfs = await create({
          repo: String(Math.random() + Date.now()),
        });
      }
    },
    store: async function (filename: string, content: any): Promise<string> {
      await this.init();

      const fileToAdd = {
        path: filename,
        content,
      };

      const file = await ipfs.add(fileToAdd);
      const { cid } = file;

      return CID.toString(cid);
    },
    retrieve: async function (cid: any) {
      await this.init();
      const decoder = new TextDecoder();
      let content = "";

      for await (const chunk of ipfs.cat(cid)) {
        content += decoder.decode(chunk, {
          stream: true,
        });
      }
      return content;
    },
  };
})();
