export const url = {
  get: function() {
    return window.location.href;
  },
  getPageId: function() {
    const hash = window.location.hash.substr(1);
    const hashWithVersion = hash.split("?");
    const pageId = hashWithVersion[0] || null;
    return pageId;
  }
};
