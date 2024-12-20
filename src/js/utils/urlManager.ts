export const url = {
  baseUrl: `${globalThis.location.origin}${globalThis.location.pathname}`,
  get: function () {
    return globalThis.location.href;
  },
  getPageId: function (url = globalThis.location.href) {
    const URLObject = new URL(url);
    const hash = URLObject.hash.slice(1);
    const hashWithVersion = hash.split("?");
    const pageId = hashWithVersion[0] || null;
    return pageId;
  },
  getSearchParams: function (url = globalThis.location.href) {
    const URLObject = new URL(url);
    const urlParts = URLObject.href.split("?");
    const currentParams = urlParts[1] || "";
    const searchParams = new URLSearchParams(currentParams);
    return searchParams;
  },
  getParamsObject: function (
    url = globalThis.location.href,
  ): Record<string, string> {
    const params = this.getSearchParams(url);
    let parametersObject = {};
    for (const key of params.keys()) {
      parametersObject = {
        ...parametersObject,
        [key]: this.getSearchParam(key, url),
      };
    }
    return parametersObject;
  },
  getSearchParam(param: string, url = globalThis.location.href) {
    const params = this.getSearchParams(url);
    const paramValue = params.get(param);
    return paramValue;
  },
  deleteParam: function (param: string | Array<string>) {
    const searchParams = this.getSearchParams();
    if (Array.isArray(param)) {
      param.forEach((p) => {
        searchParams.delete(p);
      });
    } else {
      searchParams.delete(param);
    }
    const { pathname } = globalThis.location;
    const hash = this.getPageId();
    return globalThis.location.assign(
      `${hash ? `#${hash}` : pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`,
    );
  },
  // @ts-ignore as this is not ideal here along with TS
  set: function (pageId = this.getPageId(), params = this.getParamsObject()) {
    const allParams = {
      ...this.getParamsObject(),
      ...params,
    };
    const newParams = new URLSearchParams(allParams);
    return globalThis.location.assign(`#${pageId}?${newParams.toString()}`);
  },
};
