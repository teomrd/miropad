import select from "./dom";

const _getBasePageTitle = () => {
  const titleSections = document.title.split("|");
  const baseTitle = titleSections[0];
  return baseTitle;
};

const setPageTitle = what => {
  const baseTitle = _getBasePageTitle();
  document.title = baseTitle.trim() + " | " + what.trim();
  select(".title").html(what.trim());
};

const resetPageTitle = () => {
  const baseTitle = _getBasePageTitle();
  document.title = baseTitle;
  select(".title").html(baseTitle);
};

export { setPageTitle, resetPageTitle };
