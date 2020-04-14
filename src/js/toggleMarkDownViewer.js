import showdown from "showdown";
import select from "./utils/dom";
import { url } from "./utils/urlManager";
import { copyToClipboard } from "./utils/copyToClipboard";

const converter = new showdown.Converter({
  tasklists: true,
  emoji: true,
  simplifiedAutoLink: true,
  tables: true,
  openLinksInNewWindow: true,
});

converter.setFlavor("github");

export const markDownIt = () => {
  const mdView = select(".preview").innerHTML(
    converter.makeHtml(select(".terminal").getValue())
  );

  select("code").listenAll("click", async ({ innerHTML }) => {
    await copyToClipboard(innerHTML, "📋 Code copied to clipboard");
  });

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
          md: true,
        });
      }
    },
  };
};

const toggleMarkDownViewer = () => markDownIt().toggle();

export default toggleMarkDownViewer;
