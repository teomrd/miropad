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

      var module = cache[name] = new newRequire.Module(name);

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

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({18:[function(require,module,exports) {
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
    throw new Error();
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
},{}],13:[function(require,module,exports) {
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
},{"./bundle-url":18}],6:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":13}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isJSON = function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

exports.default = isJSON;
},{}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notify = function () {
  function Notify() {
    var _this = this;

    _classCallCheck(this, Notify);

    this.notificationContainer = document.querySelector('body #notification');
    this.defaultAutohideDuration = 5;
    this.autohideDuration = 5;
    this.types = {
      info: 'info',
      success: 'success',
      error: 'error',
      warning: 'warning'
    };
    this.timer;
    this.notificationContainer.onclick = function () {
      _this._cleanNotificationClasses();
    };
  }

  _createClass(Notify, [{
    key: '_cleanNotificationClasses',
    value: function _cleanNotificationClasses() {
      var _this2 = this;

      Object.keys(this.types).map(function (type) {
        return _this2.notificationContainer.classList.remove(type);
      });
    }
  }, {
    key: '_removeAfter',
    value: function _removeAfter() {
      var _this3 = this;

      this.timer = setTimeout(function () {
        _this3._cleanNotificationClasses();
      }, this.autohideDuration * 1000);
    }
  }, {
    key: '_clearTimeouts',
    value: function _clearTimeouts() {
      clearTimeout(this.timer);
    }
  }, {
    key: '_showNotification',
    value: function _showNotification(message, type) {
      this._cleanNotificationClasses();
      this.notificationContainer.innerHTML = message;
      this._clearTimeouts();
      this.notificationContainer.classList.add(type);
      this._removeAfter();
    }
  }, {
    key: 'info',
    value: function info(message) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultAutohideDuration;

      this.autohideDuration = time;
      this._showNotification(message, this.types.info);
    }
  }, {
    key: 'sucess',
    value: function sucess(message) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultAutohideDuration;

      this.autohideDuration = time;
      this._showNotification(message, this.types.success);
    }
  }, {
    key: 'error',
    value: function error(message) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultAutohideDuration;

      this.autohideDuration = time;
      this._showNotification(message, this.types.error);
    }
  }, {
    key: 'warning',
    value: function warning(message) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultAutohideDuration;

      this.autohideDuration = time;
      this._showNotification(message, this.types.warning);
    }
  }]);

  return Notify;
}();

var notify = new Notify();
exports.default = notify;
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isJSON = require('./isJSON');

var _isJSON2 = _interopRequireDefault(_isJSON);

var _notify = require('../notify');

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettifyJSON = function prettifyJSON(selector) {
  var el = document.querySelector(selector);
  if ((0, _isJSON2.default)(el.value)) {
    var prettifiedJSON = JSON.stringify(JSON.parse(el.value), null, 2);
    el.value = prettifiedJSON;
    _notify2.default.sucess('👍 JSON value prettified');
  } else {
    _notify2.default.error('😧 Value is not in valid JSON format');
  }
};

exports.default = prettifyJSON;
},{"./isJSON":17,"../notify":15}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global crypto, TextEncoder */
// more info about the hashBrowser function ==> https://github.com/Chalarangelo/30-seconds-of-code#hashbrowser-

var hashBrowser = function hashBrowser(val) {
  return crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val)).then(function (h) {
    var hexes = [];
    var view = new DataView(h);
    for (var i = 0; i < view.byteLength; i += 4) {
      hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
    }
    return hexes.join('');
  });
};

exports.default = hashBrowser;
},{}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSavedState = exports.saveToLocalStorage = undefined;
var _this = undefined;

var _hashBrowser = require('./hashBrowser');

var _hashBrowser2 = _interopRequireDefault(_hashBrowser);

var _notify = require('../notify');

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var saveToLocalStorage = exports.saveToLocalStorage = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(what) {
    var hash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!what.length) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return (0, _hashBrowser2.default)(what);

          case 3:
            hash = _context.sent;

            try {
              localStorage.setItem(hash, what);
              window.location.assign('#' + hash);
              _notify2.default.sucess('👌 Note saved!');
            } catch (e) {
              _notify2.default.error('\uD83D\uDE31 Something went wrong while trying to save to local storage ' + e); // eslint-disable-line
            }
            _context.next = 8;
            break;

          case 7:
            _notify2.default.warning('😕 Nothing to save!'); // eslint-disable-line

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function saveToLocalStorage(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSavedState = exports.getSavedState = function getSavedState() {
  var hash = window.location.hash.substr(1);
  var savedTxt = localStorage.getItem(hash);
  return savedTxt;
};
},{"./hashBrowser":16,"../notify":15}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _notify = require('./notify');

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var welcomeUser = function welcomeUser() {
  var lastVisit = localStorage.getItem('miropad.user');
  if (lastVisit) {
    _notify2.default.info('\uD83E\uDD17 Happy to see you again from ' + lastVisit);
  } else {
    _notify2.default.info('<h1>Welcome \uD83D\uDC4B \uD83D\uDE03 </h1>\n    <p>Use  Ctrl+S:  to save your note<p/>\n    <p>& Ctrl+P: to format a JSON doc<p/>', 100);
  }
  localStorage.setItem('miropad.user', new Date().toLocaleDateString());
};

exports.default = welcomeUser;
},{"./notify":15}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../css/styles.css');

var _prettifyJSON = require('./utils/prettifyJSON');

var _prettifyJSON2 = _interopRequireDefault(_prettifyJSON);

var _localstorage = require('./utils/localstorage');

var _welcome = require('./welcome');

var _welcome2 = _interopRequireDefault(_welcome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listeners = function listeners(e) {
  var evtobj = window.event || e;
  // Control + p
  if (evtobj.keyCode === 80 && evtobj.ctrlKey) {
    e.preventDefault();
    (0, _prettifyJSON2.default)('.terminal');
  }
  // Control + s
  if (evtobj.keyCode === 83 && evtobj.ctrlKey) {
    e.preventDefault();
    var text = document.querySelector('.terminal').value;
    (0, _localstorage.saveToLocalStorage)(text);
  }
};

var main = function main() {
  (0, _welcome2.default)();
  document.onkeydown = listeners;
  var savedTxt = (0, _localstorage.getSavedState)();
  document.querySelector('.terminal').value = savedTxt;
};

exports.default = main;
},{"../css/styles.css":6,"./utils/prettifyJSON":8,"./utils/localstorage":9,"./welcome":7}],2:[function(require,module,exports) {
'use strict';

var _main = require('./js/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Hello World!');

(0, _main2.default)();
},{"./js/main":4}],19:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57675' + '/');
  ws.onmessage = function (event) {
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
        location.reload();
      };
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
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
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
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[19,2])
//# sourceMappingURL=/dist/miropad.map