import showdown from "showdown";
import select from "./utils/dom";

const converter = new showdown.Converter({
  tasklists: true,
  emoji: true,
  simplifiedAutoLink: true,
  tables: true,
  openLinksInNewWindow: true
});

converter.setFlavor("github");

export const markDownIt = () =>
  select(".preview").html(converter.makeHtml(select(".terminal").getValue()));

const toggleMarkDownViewer = () => markDownIt().toggle();

export default toggleMarkDownViewer;
