import showdown from "showdown";
import select from "./utils/dom";

const converter = new showdown.Converter();

const toggleMarkDownViewer = () =>
  select(".preview")
    .html(converter.makeHtml(document.querySelector(".terminal").value))
    .toggle();

export default toggleMarkDownViewer;
