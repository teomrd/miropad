export const url = {
  baseUrl: `${window.location.origin}${window.location.pathname}`,
  get: function () {
    return window.location.href;
  },
  getPageId: function (url = window.location.href) {
    const URLObject = new URL(url);
    const hash = URLObject.hash.substr(1);
    const hashWithVersion = hash.split("?");
    const pageId = hashWithVersion[0] || null;
    return pageId;
  },
  getSearchParams: function (url = window.location.href) {
    const URLObject = new URL(url);
    const urlParts = URLObject.href.split("?");
    const currentParams = urlParts[1] || "";
    const searchParams = new URLSearchParams(currentParams);
    return searchParams;
  },
  getParamsObject: function (url = window.location.href) {
    const params = this.getSearchParams(url);
    let parametersObject = {};
    for (const key of params.keys()) {
      parametersObject = {
        ...parametersObject,
        [key]: this.getSearchParam(key),
      };
    }
    return parametersObject;
  },
  getSearchParam(param) {
    const params = this.getSearchParams();
    const paramValue = params.get(param);
    return paramValue;
  },
  deleteParam: function (param) {
    const searchParams = this.getSearchParams();
    if (typeof param === "object" && param.length > 0) {
      param.forEach((p) => {
        searchParams.delete(p);
      });
    } else {
      searchParams.delete(param);
    }
    const { pathname } = window.location;
    const hash = this.getPageId();
    return window.location.assign(
      `${hash ? `#${hash}` : pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`
    );
  },
  set: function (pageId = this.getPageId(), params = this.getParamsObject()) {
    const allParams = {
      ...this.getParamsObject(),
      ...params,
    };
    const newParams = new URLSearchParams(allParams);
    return window.location.assign(`#${pageId}?${newParams.toString()}`);
  },
};
