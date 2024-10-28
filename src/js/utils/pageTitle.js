import select from './dom.js';

const _getBasePageTitle = () => {
  const titleSections = document.title.split('|');
  const baseTitle = titleSections[0];
  return baseTitle;
};

const setPageTitle = (what) => {
  const baseTitle = _getBasePageTitle();
  document.title = baseTitle.trim() + ' | ' + what.trim();
  select('.title h3').html(what.trim());
};

const resetPageTitle = () => {
  const baseTitle = _getBasePageTitle();
  document.title = baseTitle;
  select('title').innerHTML(`${TITLE_NAME} v${VERSION}`);
  select('.title h3').innerHTML(
    `${TITLE_NAME} <span class="version">v${VERSION}</span>`,
  );
};

export { resetPageTitle, setPageTitle };
