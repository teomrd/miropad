import { isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import {next as A} from "@automerge/automerge"
import { url } from "../utils/urlManager"

export const automerge = (() => {
  let repo: Repo;
  return {
    init: () => {
      if (!repo) {
        console.log('initialize automerge repo 👉');
        repo = new Repo({
          network: [new BroadcastChannelNetworkAdapter()],
          storage: new IndexedDBStorageAdapter(),
        });
      } else {
        console.log('automerge repo already there');
      }
    },
    createDocument: () => {
      const pageId = url.getPageId();
      console.log('pageId 👉', pageId);
      let handle
      if (isValidAutomergeUrl(pageId)) {
          handle = repo.find(pageId)
      } else {
          handle = repo.create<{counter?: A.Counter}>()
          handle.change(d => d.counter = new A.Counter())
      }
    }
  };
})();
