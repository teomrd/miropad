import { create } from 'ipfs-core';

export const ipfs = (() => {
  let ipfs;

  return {
    init: async () => {
      if(!ipfs) {
        console.log("Initializing IPFS");
        ipfs = await create({
          repo: String(Math.random() + Date.now()),
        })
        console.log("IPFS initialized ✅");
      }
    },
    store: async function (data =  'Hello, Theo') {
      await this.init();

      const fileToAdd = {
        path: `1.txt`,
        content: data
      };

      const file = await ipfs.add(fileToAdd);
      console.log('file 👉', file);

      const { cid } = file;
      console.log('cid 👉', cid);
      return cid;
    },
    retrieve: async function (cid: string = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A') {
      await this.init();
      const decoder = new TextDecoder();
      let content = ''

      for await (const chunk of ipfs.cat(cid)) {
        content += decoder.decode(chunk, {
          stream: true
        });
      }
      console.log('content 👉', content);
      return content
    }
  }
})();