import showdown from "showdown";
import select from "./utils/dom";

const converter = new showdown.Converter();

export const markDownIt = () =>
  select(".preview").html(
    converter.makeHtml(document.querySelector(".terminal").value)
  );

const toggleMarkDownViewer = () => markDownIt().toggle();

export default toggleMarkDownViewer;
