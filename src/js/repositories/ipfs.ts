import { create } from "ipfs-core";
import { Note } from "../components/organisms/noteManager/noteManager";
import { base64 } from "multiformats/bases/base64";

export const ipfs = (() => {
  let ipfs;

  return {
    init: async () => {
      if (!ipfs) {
        console.log("Initializing IPFS");
        ipfs = await create({
          repo: String(Math.random() + Date.now()),
        });
        console.log("IPFS initialized ✅");
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
      console.log("cid 👉", cid);
      return cid.toV1().toString(base64.encoder);
    },
    retrieve: async function (cid: string) {
      await this.init();
      const decoder = new TextDecoder();
      let content = "";

      for await (const chunk of ipfs.cat(cid)) {
        content += decoder.decode(chunk, {
          stream: true,
        });
      }
      console.log("content 👉", content);
      return content;
    },
  };
})();
