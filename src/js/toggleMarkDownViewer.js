import showdown from "showdown";
import select from "./utils/dom";
import { url } from "./utils/urlManager";

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
      const isVisible = Boolean(url.getSearchParam("md"));
      if (isVisible === true) {
        mdView.show();
      } else {
        mdView.hide();
      }
    },
    toggle: () => {
      const isVisible = Boolean(url.getSearchParam("md"));
      if (isVisible === true) {
        mdView.hide();
        url.deleteParam("md");
      } else {
        mdView.show();
        url.set(undefined, {
          md: true
        });
      }
    }
  };
};

const toggleMarkDownViewer = () => markDownIt().toggle();

export default toggleMarkDownViewer;
