// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"/8+z":[function(require,module,exports) {
const DEFAULT_BASE_URL = 'https://web3api.io/api/v1';

class Web3Data {
  constructor(config) {
    this.config = config;

    if (!this.config) {
      throw new Error('No configuration object supplied');
    }
    if (!this.config.apiKey) {
      throw new Error('No api key supplied');
    }
    if (!this.config.blockchainId) {
      throw new Error('No Blockchain specified');
    }
    this.baseUrl = this.config.baseUrl ? this.config.baseUrl : DEFAULT_BASE_URL;
    this.headers = {
      'x-amberdata-api-key': this.config.apiKey,
      'x-amberdata-blockchain-id': this.config.blockchainId
    };

    this.url = '';
    this.params = '?';
  }

  /* ---- Methods --- */

  // addresses() {
  // }

  addresses(hash) {
    if (!hash) {
      throw new Error('No address hash provided');
    }

    this.url += `/addresses/${hash}`;
    return this;
  }

  info() {
    this.url += '/information';
    return this;
  }

  stats() {
    this.url += '/statistics';
    return this;
  }

  transactions(txhash) {
    this.url += '/transactions';
    if (arguments.length === 1) {
      return this.filter({ transactionHash: txhash });
    }

    return this;
  }

  logs() {
    this.url += '/logs';
    return this;
  }

  functions(functionHash) {
    this.url += '/functions';
    if (arguments.length === 1) {
      return this.filter({ transactionHash: functionHash });
    }
    return this;
  }

  tokens(tokenHash) {
    this.url += '/tokens';
    if (arguments.length === 1) {
      return this.filter({ tokenAddress: tokenHash });
    }

    return this;
  }

  /* ---- Modifiers --- */

  filter(filterOptions) {
    for (const filter in filterOptions) {
      if ({}.hasOwnProperty.call(filterOptions, filter)) {
        this.params += `${filter}=${filterOptions[filter]}&`;
      }
    }
    return this;
  }

  limit(n) {
    return this.filter({ size: n });
  }

  size(n) {
    return this.limit(n);
  }

  offset(index) {
    return this.filter({ page: index });
  }

  page(index) {
    return this.offset(index);
  }

  orderBy(fieldName) {
    return this.filter({ orderBy: fieldName });
  }

  direction(dir) {
    return this.filter({ direction: dir });
  }
}

module.exports = Web3Data;
},{}],"kwvz":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function retrieve() {
  // Remove '?' if there are no params
  if (this.params.length === 1) {
    this.params = '';
  }
  try {
    const response = await (0, _got2.default)(this.url + this.params, {
      baseUrl: this.baseUrl,
      headers: this.headers,
      json: true
    });
    return response.body;
  } catch (error) {
    return error;
  }
}
exports.default = retrieve;
},{}],"Focm":[function(require,module,exports) {
const Web3Data = require('./lib/web3data');
const retrieve = require('./lib/node/retrieve');

// Overriden to use the for browsers
Web3Data.prototype.retrieve = retrieve;
module.exports = Web3Data;
},{"./lib/web3data":"/8+z","./lib/node/retrieve":"kwvz"}]},{},["Focm"], null)
//# sourceMappingURL=/web3data.map