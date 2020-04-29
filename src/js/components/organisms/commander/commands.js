import { commanderModes } from "./modes";
import {
  saveNote,
  getNote,
  resetNoteManager,
  getNotes,
  markNoteForDeletion,
} from "../noteManager/noteManager";
import select from "../../../utils/dom";
import storage from "../../../utils/localstorage";
import {
  goAuthenticate,
  setGistToSyncWith,
  syncNotesWithGitHub,
} from "../../../utils/github/actions";
import commander from "./commander";
import { saveFileAs } from "../../../utils/fileSystem/fileSystem";
import { url } from "../../../utils/urlManager";
import { mailTo } from "../../../utils/mail";
import markDownViewer from "../markDownViewer";
import prettifyJSON from "../../../utils/prettifyJSON";
import notify from "../../molecules/notify";
import ipfs from "../../../utils/ipfs";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import { sleep } from "../../../utils/sleep";
import { deleteFileOnGist, updateGist } from "../../../utils/github/api";

export const commands = [
  {
    title: "📒 List saved notes",
    key: "p",
    call: () => {
      commander.state.mode !== commanderModes.notes
        ? commander.show(commanderModes.notes)
        : commander.hide();
    },
  },
  {
    title: "💾 Save",
    key: "s",
    call: () => {
      saveNote(select(".terminal").getValue());
      updateGist([getNote()]);
      select(".logo").removeClass("unsaved");
    },
  },
  {
    title: "🔄 Sync: Notes my GitHub Gist (requires auth)",
    key: null,
    call: async () => {
      const token = storage.get("authToken");
      if (!token) {
        return await goAuthenticate();
      }
      const gistId = storage.get("gistId");
      if (!gistId) {
        return await setGistToSyncWith(token);
      }
      commander.hide();
      await syncNotesWithGitHub();
    },
  },
  {
    title: "🔄 Sync: Reset Gist settings",
    key: null,
    call: async () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("gistId");
      localStorage.removeItem("lastLocalUpdate");
      localStorage.removeItem("lastSync");
      notify.info("Gist setting have been reset!");
      commander.hide();
    },
  },
  {
    title: "💾 Save to File System (Experimental browser feature)...",
    key: "shift s",
    call: async () => {
      const { text, title } = getNote();
      await navigator.clipboard.writeText(title);
      saveFileAs(text);
      commander.hide();
    },
  },
  {
    title: "🗑 Trash note",
    key: "shift d",
    call: () => {
      const confirmation = confirm("Are you sure you want do that?");
      if (confirmation) {
        const note = getNote();
        resetNoteManager();
        if (note && note.id) {
          deleteFileOnGist(note.id);
          markNoteForDeletion(note.id);
        }
      }
      commander.hide();
    },
  },
  {
    title: "📡 Save to IPFS",
    key: "i",
    call: () => {
      ipfs.save(select(".terminal").getValue());
      commander.hide();
    },
  },
  {
    title: "📬 Email note to...",
    key: "e",
    call: () => {
      const note = `${
        document.querySelector(".terminal").value
      } \n ${url.get()}`;
      mailTo(note);
      commander.hide();
    },
  },
  {
    title: "🌌 Add a cover picture",
    key: null,
    call: async () => {
      const bgImage = prompt("Paste the image URL in here...");
      commander.hide();
      await sleep(200); // need to wait after prompt for some reason before copy
      copyToClipboard(
        `<div class="cover" style="background-image: url('${bgImage}')"></div>`,
        "👌Copied! Paste the code on the MiroPad editor"
      );
      select(".terminal").focus();
      notify.info(
        "Paste the cover picture wherever you prefer on the MirPad editor"
      );
    },
  },
  {
    title: "🖨 Print MarkDown output",
    key: null,
    call: () => {
      select(".preview").show();
      markDownViewer();
      window.print();
      commander.hide();
    },
  },
  {
    title: "◽ Full MarkDown view",
    key: "shift m",
    call: () => {
      markDownViewer().show("full");
      commander.hide();
    },
  },
  {
    title: "🔳 Toggle MarkDown Viewer",
    key: "m",
    call: () => {
      markDownViewer().toggle();
      commander.hide();
    },
  },
  {
    key: "j",
    title: "💄 Prettify JSON document",
    call: () => {
      prettifyJSON(".terminal");
      commander.hide();
    },
  },
  {
    title: "🎨 Toggle command palette",
    key: "shift p",
    call: () => {
      commander.state.mode !== commanderModes.commands
        ? commander.show(commanderModes.commands)
        : commander.hide();
    },
  },
  {
    title: " 🕵️‍♂️ Find and Replace...",
    key: "shift f",
    call: () => {
      const selectedValue = select(".terminal")
        .getValue()
        .slice(
          select(".terminal").el.selectionStart,
          select(".terminal").el.selectionEnd
        );
      const valueToFind = prompt("What do you wanna find?", selectedValue);
      if (!valueToFind) {
        return this;
      }
      const positionOfFirstChar = select(".terminal")
        .getValue()
        .indexOf(valueToFind);

      select(".terminal").el.setSelectionRange(
        positionOfFirstChar,
        positionOfFirstChar + valueToFind.length
      );
      const replacementValue = prompt(`Replace ${valueToFind} with...`);
      if (replacementValue) {
        select(".terminal").el.setRangeText(replacementValue);
      }
    },
  },
];
