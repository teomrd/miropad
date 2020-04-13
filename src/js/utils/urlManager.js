export const url = {
  get: function () {
    return window.location.href;
  },
  getPageId: function () {
    const hash = window.location.hash.substr(1);
    const hashWithVersion = hash.split("?");
    const pageId = hashWithVersion[0] || null;
    return pageId;
  },
  getSearchParams: function () {
    const urlParts = window.location.href.split("?");
    const currentParams = urlParts[1] || "";
    const searchParams = new URLSearchParams(currentParams);
    return searchParams;
  },
  getParamsObject: function () {
    const params = this.getSearchParams();
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
    const { protocol, host, pathname } = window.location;
    return this.getPageId()
      ? window.location.assign(`#${this.getPageId()}?${searchParams.toString()}`) // eslint-disable-line
      : window.location.replace(`${protocol}/${host}${pathname}?${searchParams.toString()}`); // eslint-disable-line
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
