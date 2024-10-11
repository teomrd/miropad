import select from "../../../utils/dom";
import { url } from "../../../utils/urlManager";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import { button } from "../../atoms/button/button";
import { convertMarkDownToHtml } from "./mdToHtml";
import storage from "../../../utils/localstorage";

const markDownViewer = (() => {
  return {
    view: select(".preview"),
    init: function () {
      this.update();
      select(".terminal").listen("input", () => this.update());
      const isVisible = Boolean(url.getSearchParam("md"));
      if (isVisible) {
        this.view.show();
      } else {
        this.view.hide();
      }
      return this;
    },
    autoLink: function () {
      const autoLinks = storage.parse("__auto-links__");
      const replacingPatterns = Object.keys(autoLinks).join("|");
      // Regular expression to match text starting with the given patterns
      const regex = new RegExp(`\\b(${replacingPatterns})\\d+\\b(?=\\s)`, "g");
      const updatedHTML = this.view.el.innerHTML.replace(regex, (match) => {
        const matchingKey = Object.keys(autoLinks).find((link) =>
          match.startsWith(link)
        );
        const link = autoLinks[matchingKey];
        return `<a href="${link}${match}" target="_blank">${match}</a>`;
      });
      // Replace each matching text with a link
      this.view.innerHTML(updatedHTML);
    },
    update: async function () {
      const md = select(".terminal").getValue();

      this.view.innerHTML(convertMarkDownToHtml(md));

      this.autoLink();

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
        select(".console").show().innerHTML(result);
      });
      select(".console").listen("click", async (e) => {
        e.srcElement.classList.add("hidden");
        const codeToCopy = e.srcElement.innerHTML;
        await copyToClipboard(codeToCopy, "📋 Code copied to clipboard");
      });
    },
    show: function (mode = true) {
      this.view.show();
      url.set(undefined, {
        md: mode,
      });
    },
    hide: function () {
      this.view.hide();
      url.deleteParam("md");
    },
    toggle: function (mode = "true") {
      if (url.getSearchParam("md") === mode) {
        this.hide();
      } else {
        this.show(mode);
      }
      return this;
    },
  };
})();

export default markDownViewer;
