import select from "../../../utils/dom.js";
import { url } from "../../../utils/urlManager.ts";
import { copyToClipboard } from "../../../utils/copyToClipboard.ts";
import { button } from "../../atoms/button/button.js";
import { convertMarkDownToHtml } from "./mdToHtml.ts";
import storage from "../../../utils/localstorage.js";

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
      if (!autoLinks) return;
      // Regular expression to match any words starting with the given patterns
      const replacingPatterns = Object.keys(autoLinks)
        .map((pattern) => `${pattern}\\w+`)
        .join("|");
      const regex = new RegExp(`(${replacingPatterns})`, "g");

      const updatedHTML = this.view.el.innerHTML.replace(regex, (match) => {
        const matchingKey = Object.keys(autoLinks).find((link) =>
          match.startsWith(link)
        );
        const link = autoLinks[matchingKey];
        return link.startsWith("http")
          ? `<a href="${link}${match}" target="_blank">${match}</a>`
          : `<a href="${link}${match}">${match}</a>`;
      });
      // Replace each matching text with a link
      this.view.innerHTML(updatedHTML);
    },
    update: function () {
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

      select("code").listenAll("click", ({ innerHTML }) => {
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
