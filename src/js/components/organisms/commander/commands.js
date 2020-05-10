import { commanderModes } from "./modes";
import {
  saveNote,
  getNote,
  resetNoteManager,
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
import { icon } from "../../atoms/icon/icon";
import ListSVG from "../../../../assets/svg/list.svg";
import TrashSVG from "../../../../assets/svg/trash.svg";
import CheckmarkCircleSVG from "../../../../assets/svg/checkmark-circle.svg";
import CloudSyncSVG from "../../../../assets/svg/cloud-sync.svg";
import LighterSVG from "../../../../assets/svg/lighter.svg";
import CloudUploadSVG from "../../../../assets/svg/cloud-upload.svg";
import DownloadSVG from "../../../../assets/svg/download.svg";
import EnvelopeSVG from "../../../../assets/svg/envelope.svg";
import PictureSVG from "../../../../assets/svg/picture.svg";
import PrinterSVG from "../../../../assets/svg/printer.svg";
import PageBreakSVG from "../../../../assets/svg/page-break.svg";
import FrameExpandSVG from "../../../../assets/svg/frame-expand.svg";
import MagicWandSVG from "../../../../assets/svg/magic-wand.svg";
import RocketSVG from "../../../../assets/svg/rocket.svg";
import SpellCheckSVG from "../../../../assets/svg/spell-check.svg";

export const commands = [
  {
    title: "List saved notes",
    icon: icon(ListSVG),
    sortTitle: "Notes",
    key: "p",
    call: () => commander.toggle(commanderModes.notes),
  },
  {
    title: "Save",
    key: "s",
    icon: icon(CheckmarkCircleSVG),
    sortTitle: "Save",
    call: async () => {
      commander.hide();
      await saveNote(select(".terminal").getValue());
      updateGist([getNote()]);
      select(".logo").removeClass("unsaved");
    },
  },
  {
    title: "Delete note",
    key: "shift d",
    icon: icon(TrashSVG),
    sortTitle: "Delete",
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
    title: "Toggle MarkDown Viewer",
    icon: icon(PageBreakSVG, "rotate90"),
    sortTitle: "Split",
    key: "m",
    call: () => {
      markDownViewer().toggle();
      commander.hide();
    },
  },
  {
    title: "Full MarkDown view",
    icon: icon(FrameExpandSVG),
    sortTitle: "Full view",
    key: "shift m",
    call: () => {
      markDownViewer().show("full");
      commander.hide();
    },
  },
  {
    title: "Sync: Notes my GitHub Gist (requires auth)",
    icon: icon(CloudSyncSVG),
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
    title: "Sync: Reset Gist settings",
    icon: icon(LighterSVG),
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
    title: "Save to File System (Experimental browser feature)...",
    icon: icon(DownloadSVG),
    key: "shift s",
    call: async () => {
      const { text, title } = getNote();
      await navigator.clipboard.writeText(title);
      saveFileAs(text);
      commander.hide();
    },
  },
  {
    title: "Save to IPFS",
    key: "i",
    icon: icon(CloudUploadSVG),
    call: () => {
      ipfs.save(select(".terminal").getValue());
      commander.hide();
    },
  },
  {
    title: "Email note to...",
    icon: icon(EnvelopeSVG),
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
    title: "Add a cover picture",
    icon: icon(PictureSVG),
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
    title: "Print MarkDown output",
    icon: icon(PrinterSVG),
    key: null,
    call: () => {
      select(".preview").show();
      markDownViewer();
      window.print();
      commander.hide();
    },
  },
  {
    key: "j",
    title: "Prettify JSON document",
    icon: icon(MagicWandSVG),
    call: () => {
      prettifyJSON(".terminal");
      commander.hide();
    },
  },
  {
    title: "Toggle command palette",
    icon: icon(RocketSVG),
    key: "shift p",
    call: () => commander.toggle(commanderModes.commands),
  },
  {
    title: "Find and Replace...",
    icon: icon(SpellCheckSVG),
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
