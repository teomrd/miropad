import showdown from 'showdown';

const converter = new showdown.Converter({
  tasklists: true,
  underline: true,
  emoji: true,
  simplifiedAutoLink: true,
  tables: true,
  openLinksInNewWindow: true,
});

converter.setFlavor('github');

export const convertMarkDownToHtml = (md) => converter.makeHtml(md);
