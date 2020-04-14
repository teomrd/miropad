import showdown from "showdown";
import select from "./utils/dom";
import { url } from "./utils/urlManager";
import { copyToClipboard } from "./utils/copyToClipboard";
import { button } from "./components/button/button";
import notify from "./notify";

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

  const { elements } = select("pre");
  Array.prototype.slice.call(elements).forEach((el) => {
    const copyBtn = button("📋 Copy", async (e) => {
      e.stopPropagation();
      const codeToCopy = e.srcElement.previousSibling.innerHTML;
      await copyToClipboard(codeToCopy, "📋 Code copied to clipboard");
    });
    el.appendChild(copyBtn);
  });

  select("code").listenAll("click", async ({ innerHTML }) => {
    const result = eval(innerHTML);
    console.log(result);
    select(".console").show().innerHTML(result);
  });
  select(".console").listen("click", (el) => el.hide());

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
