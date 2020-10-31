const unified = require("unified");
const markdown = require("remark-parse");
const remark2rehype = require("remark-rehype");
const doc = require("rehype-document");
const format = require("rehype-format");
const html = require("rehype-stringify");

export const convertMarkDownToHtml = (md) =>
  new Promise((resolve, reject) => {
    unified()
      .use(markdown)
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
