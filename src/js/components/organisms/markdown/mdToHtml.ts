import { parse, renderHTML } from "@djot/djot";

export const convertMarkDownToHtml = (md: string) => {
  return renderHTML(
    parse(md, {
      warn: (warning) => console.log(warning.render()),
    }),
    {
      overrides: {
        code_block: (node) => {
          return `<pre><code class="language-${node.lang} ${node.lang}">${node.text}</code></pre>`;
        },
        task_list_item: (node, renderer) => {
          const isChecked = node.checkbox === "checked";
          return `
            <li>
              <input type="checkbox" ${isChecked ? "checked" : ""} />
              ${renderer.renderChildren(node)}
            </li>
            `;
        },
      },
    },
  );
};
