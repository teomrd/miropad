import * as Automerge from "@automerge/automerge";
import { setPageTitle } from "../../utils/pageTitle";
import { encodeTitle } from "../../components/organisms/noteManager/noteManager";
import storage from "../localforage";

export const networkHandler = (() => {
  let doc = Automerge.init();
  return {
    getActor: function () {
      let actorId = Automerge.getActorId(doc);
      return actorId;
    },
    update: async function (id, newDoc) {
      doc = newDoc;
      let binary = Automerge.save(newDoc);
      storage.set(id, binary);
    },
    getDocById: async function (id) {
      let binary = await storage.get(id);

      if (binary) {
        doc = Automerge.load(binary);
        return doc;
      }
    },
    updateDoc: function (text) {
      let newDoc = Automerge.change(doc, (doc) => {
        if (!doc.text) doc.text = "";
        doc.text = text;
      });

      const title = text.split("\n")[0].trim().replace("#", "").trim();
      setPageTitle(title);
      const id = encodeTitle(title);

      this.update(id, newDoc);
      return this;
    },
  };
})();
