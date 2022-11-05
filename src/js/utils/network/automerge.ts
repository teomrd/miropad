import * as Automerge from "@automerge/automerge";
import { setPageTitle } from "../../utils/pageTitle";
import { encodeTitle } from "../../components/organisms/noteManager/noteManager";
import storage from "../localforage";
import { url } from "../urlManager";
import select from "../dom";

type Document = {
  title: Automerge.Text,
  text: Automerge.Text
}

export const networkHandler = (() => {
  let doc = Automerge.change<Document>(Automerge.init(), (doc: Document) => {
    doc.title = new Automerge.Text();
    doc.text = new Automerge.Text();
  })
  const channelId = url.getPageId();
  const channel = new BroadcastChannel(channelId);
  channel.onmessage = (ev) => {
    let newDoc = Automerge.merge(doc, Automerge.load(ev.data));
    doc = newDoc;
    select(".terminal").setValue(newDoc.text);
  };

  return {
    getActor: function () {
      let actorId = Automerge.getActorId(doc);
      return actorId;
    },
    update: async function (id: string, newDoc: Document) {
      doc = newDoc;
      let binary = Automerge.save(newDoc);
      storage.set(id, binary);

      channel.postMessage(binary);
    },
    getDocById: async function (id: string) {
      let binary = await storage.get(id);

      if (binary) {
        doc = Automerge.load(binary);
        return doc;
      }
    },
    updateDoc: function (text: string) {
      let newDoc = Automerge.change(doc, (doc) => {
        if (!doc.text) doc.text = new Automerge.Text("");
        doc.text = new Automerge.Text(text);
      });

      const title = text.split("\n")[0].trim().replace("#", "").trim();
      setPageTitle(title);
      const docId = encodeTitle(title);

      this.update(docId, newDoc);
      return this;
    },
  };
})();
