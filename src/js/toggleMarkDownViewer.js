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

export const markDownIt = () => {
  const mdView = select(".preview").html(
    converter.makeHtml(select(".terminal").getValue())
  );
  return {
    ...mdView,
    init: () => {
      const urlParts = window.location.href.split("?");
      const currentParams = urlParts[1] || "";
      const searchParams = new URLSearchParams(currentParams);
      const isVisible =
        searchParams.has("md") && searchParams.get("md") !== "false";
      if (isVisible) {
        mdView.show();
      } else {
        mdView.hide();
      }
    },
    toggle: () => {
      const urlParts = window.location.href.split("?");
      const currentBaseUrl = urlParts[0];
      const currentParams = urlParts[1] || "";
      const searchParams = new URLSearchParams(currentParams);
      const isVisible =
        searchParams.has("md") && searchParams.get("md") !== "false";
      if (isVisible) {
        mdView.hide();
        searchParams.delete("md");
        window.location.assign(`${currentBaseUrl}?${searchParams.toString()}`);
      } else {
        mdView.show();
        searchParams.set("md", true);
        window.location.assign(`${currentBaseUrl}?${searchParams.toString()}`);
      }
    }
  };
};

const toggleMarkDownViewer = () => markDownIt().toggle();

export default toggleMarkDownViewer;
