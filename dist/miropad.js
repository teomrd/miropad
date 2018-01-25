// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({10:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],7:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":10}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":7}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const isJSON = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

exports.default = isJSON;
},{}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Notify {
  constructor() {
    this.notificationContainer = document.querySelector('body #notification');
    this.autohideDuration = 5000;
    this.types = ['info', 'success', 'error', 'warning'];
  }

  cleanNotificationClasses() {
    this.types.map(type => this.notificationContainer.classList.remove(type));
  }

  cleanAfter(ms = 0) {
    setTimeout(() => {
      this.cleanNotificationClasses();
    }, ms);
  }

  info(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('info');
    this.cleanAfter(this.autohideDuration);
  }

  sucess(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('success');
    this.cleanAfter(this.autohideDuration);
  }

  error(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('error');
    this.cleanAfter(this.autohideDuration);
  }

  warning(message) {
    this.notificationContainer.innerHTML = message;
    this.cleanNotificationClasses();
    this.notificationContainer.classList.add('warning');
    this.cleanAfter(this.autohideDuration);
  }
}

const notify = new Notify();
exports.default = notify;
},{}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isJSON = require("./isJSON");

var _isJSON2 = _interopRequireDefault(_isJSON);

var _notify = require("../notify");

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prettifyJSON = selector => {
  const el = document.querySelector(selector);
  if ((0, _isJSON2.default)(el.value)) {
    const prettifiedJSON = JSON.stringify(JSON.parse(el.value), null, 2);
    el.value = prettifiedJSON;
    _notify2.default.sucess('JSON value prettified');
  } else {
    _notify2.default.error('Value is not in valid JSON format');
  }
};

exports.default = prettifyJSON;
},{"./isJSON":9,"../notify":8}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hashCode;
/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */

// ToDo: find another way to create hashCodes that this method
function hashCode(s) {
  let h = 0;
  const l = s.length;
  let i = 0;
  if (l > 0) while (i < l) h = (h << 5) - h + s.charCodeAt(i++) | 0; // eslint-disable-line
  return h;
}
},{}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedState = exports.saveToLocalStorage = undefined;

var _hashCode = require("./hashCode");

var _hashCode2 = _interopRequireDefault(_hashCode);

var _notify = require("../notify");

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveToLocalStorage = exports.saveToLocalStorage = what => {
  if (what.length) {
    const hash = (0, _hashCode2.default)(what);
    try {
      localStorage.setItem(hash, what);
      window.location.assign(`#${hash}`);
      _notify2.default.sucess('Note saved!');
    } catch (e) {
      _notify2.default.error(`Something went wrong while trying to save to local storage ${e}`); // eslint-disable-line
    }
  } else {
    _notify2.default.warning('Nothing to save!'); // eslint-disable-line
  }
};

const getSavedState = exports.getSavedState = () => {
  const hash = window.location.hash.substr(1);
  const savedTxt = localStorage.getItem(hash);
  return savedTxt;
};
},{"./hashCode":11,"../notify":8}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../css/styles.css");

var _prettifyJSON = require("./utils/prettifyJSON");

var _prettifyJSON2 = _interopRequireDefault(_prettifyJSON);

var _localstorage = require("./utils/localstorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listeners = e => {
  const evtobj = window.event || e;
  // Control + p
  if (evtobj.keyCode === 80 && evtobj.ctrlKey) {
    e.preventDefault();
    (0, _prettifyJSON2.default)('.terminal');
  }
  // Control + s
  if (evtobj.keyCode === 83 && evtobj.ctrlKey) {
    e.preventDefault();
    const text = document.querySelector('.terminal').value;
    (0, _localstorage.saveToLocalStorage)(text);
  }
};

const main = () => {
  document.onkeydown = listeners;
  const savedTxt = (0, _localstorage.getSavedState)();
  document.querySelector('.terminal').value = savedTxt;
};

exports.default = main;
},{"../css/styles.css":4,"./utils/prettifyJSON":5,"./utils/localstorage":6}],2:[function(require,module,exports) {
"use strict";

var _main = require("./js/main");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _main2.default)();
},{"./js/main":3}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':59611/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,2])