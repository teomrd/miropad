const setPageTitle = what => {
  const titleSections = document.title.split("|");
  const baseTitle = titleSections[0];
  document.title = baseTitle.trim() + " | " + what.trim();
};

export default setPageTitle;
