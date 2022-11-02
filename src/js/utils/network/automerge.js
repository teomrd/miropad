import * as Automerge from "@automerge/automerge";
import storage from "../localforage";

export const networkHandler = (() => {
  let doc = Automerge.init();
  return {
    hello: function () {
      console.log("Hello from Automerge", doc);
    },
    logActor: function () {
      let actorId = Automerge.getActorId(doc);
      console.log(actorId);
    },
    updateDoc: async function (newDoc) {
      doc = newDoc;
      let binary = Automerge.save(newDoc);
      storage.set("some", binary);

      this.render(doc);
    },
    getDocById: async function (id) {
      let binary = await storage.get(id);

      if (binary) {
        doc = Automerge.load(binary);
        return doc;
      }
    },
    addItem: function (text) {
      let newDoc = Automerge.change(doc, (doc) => {
        if (!doc.items) doc.items = [];
        doc.items.push({ text, done: false });
      });
      console.log("newDoc", newDoc);
      this.updateDoc(newDoc);
      return this;
    },
    render: function (doc) {
      console.log("doc", doc);
    },
  };
})();
