import {
  AnyDocumentId,
  AutomergeUrl,
  DocHandle,
  Repo,
  isValidAutomergeUrl,
} from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { url } from "../utils/urlManager";
import * as Automerge from "@automerge/automerge";

import type { MarkdownDoc } from "./schema";
import notify from "../components/molecules/notify";

export const automerger = (() => {
  let repo: Repo;
  return {
    init: function () {
      if (!repo) {
        console.log("initialize automerge repo 👉");
        repo = new Repo({
          network: [new BroadcastChannelNetworkAdapter()],
          storage: new IndexedDBStorageAdapter(),
        });
      } else {
        console.log("automerge repo already there");
      }
    },
    findHandleByDocUrl: function (
      rootDocUrl: AnyDocumentId
    ): DocHandle<MarkdownDoc> {
      return repo.find(rootDocUrl);
    },
    findDocument: function (id: string): DocHandle<MarkdownDoc> | undefined {
      if (isValidAutomergeUrl(id)) {
        return repo.find(id);
      }
      notify.error("Invalid automerge url");
      return undefined;
    },
    saveNote: function ({
      documentId = url.getPageId(),
      text,
    }: {
      documentId?: string | null;
      text: string;
    }) {
      try {
        console.log("automerge saveNote  👉", {
          documentId,
          text,
        });
        if (isValidAutomergeUrl(documentId)) {
          console.log("isValidAutomergeUrl 👉");
          const handle = automerger.findHandleByDocUrl(documentId);
          console.log("handle 👉", handle);
          automerger.updateNoteDocument(handle, text);
        }
      } catch (error) {
        console.log("saveNote error 👉", error);
      }
    },
    getVersions: async function (
      documentId = url.getPageId()
    ): Promise<Automerge.next.Doc<MarkdownDoc>> {
      try {
        if (isValidAutomergeUrl(documentId)) {
          console.log("automerge getVersions  👉", {
            documentId,
          });
          const handle = automerger.findHandleByDocUrl(documentId);
          const doc = (await handle.doc()) as Automerge.Doc<MarkdownDoc>;
          const heads = Automerge.getHeads(doc);
          console.log("heads 👉", heads);

          const documentInTime = Automerge.view(doc, heads);
          return documentInTime;
        }
        throw new Error("Invalid Automerge URL");
      } catch (error) {
        console.log("getVersions error 👉", error);
        throw error;
      }
    },
    createNoteDocument: function (): AutomergeUrl {
      const handle = repo.create<MarkdownDoc>();
      console.log("handle url 👉", handle.url);
      return handle.url;
    },
    updateNoteDocument: function (
      handle: DocHandle<MarkdownDoc>,
      text: string
    ) {
      console.log("updateNoteDocument 👉", {
        isReady: handle.isReady(),
      });

      const isDocumentReady = handle.isReady();
      if (isDocumentReady) {
        handle.change((doc: MarkdownDoc) => {
          doc.content = text;
        });
      }
    },
  } as const;
})();
