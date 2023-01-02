import unified from "unified";
import parse from "remark-parse";
import gfm from "remark-gfm";
import remark2rehype from "remark-rehype";
import doc from "rehype-document";
import format from "rehype-format";
import html from "rehype-stringify";

export const convertMarkDownToHtml = (md) =>
  new Promise((resolve, reject) => {
    unified()
      .use(parse)
      .use(gfm)
      .use(remark2rehype)
      .use(doc, { title: "Markdown preview" })
      .use(format)
      .use(html)
      .process(md, function (err, file) {
        if (err) reject(err);
        const html = String(file);
        resolve(html);
      });
  });
