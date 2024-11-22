import { parse, renderHTML } from "@djot/djot";

export const convertMarkDownToHtml = (md: string) => {
  return renderHTML(
    parse(md, {
      warn: (warning) => console.log(warning.render()),
    }),
  );
};
