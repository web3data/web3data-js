'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isObject = function isObject(value) {
	return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
};

var deepMerge = function deepMerge() {
	for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
		sources[_key] = arguments[_key];
	}

	var returnValue = {};

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var source = _step.value;

			if (Array.isArray(source)) {
				if (!Array.isArray(returnValue)) {
					returnValue = [];
				}

				returnValue = [].concat(_toConsumableArray(returnValue), _toConsumableArray(source));
			} else if (isObject(source)) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = Object.entries(source)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _ref = _step2.value;

						var _ref2 = _slicedToArray(_ref, 2);

						var key = _ref2[0];
						var value = _ref2[1];

						if (isObject(value) && Reflect.has(returnValue, key)) {
							value = deepMerge(returnValue[key], value);
						}

						returnValue = _extends({}, returnValue, _defineProperty({}, key, value));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return returnValue;
};

var requestMethods = ['get', 'post', 'put', 'patch', 'head', 'delete'];

var responseTypes = ['json', 'text', 'formData', 'arrayBuffer', 'blob'];

var retryMethods = new Set(['get', 'put', 'head', 'delete', 'options', 'trace']);

var retryStatusCodes = new Set([408, 413, 429, 500, 502, 503, 504]);

var HTTPError = function (_Error) {
	_inherits(HTTPError, _Error);

	function HTTPError(response) {
		_classCallCheck(this, HTTPError);

		var _this = _possibleConstructorReturn(this, (HTTPError.__proto__ || Object.getPrototypeOf(HTTPError)).call(this, response.statusText));

		_this.name = 'HTTPError';
		_this.response = response;
		return _this;
	}

	return HTTPError;
}(Error);

var TimeoutError = function (_Error2) {
	_inherits(TimeoutError, _Error2);

	function TimeoutError() {
		_classCallCheck(this, TimeoutError);

		var _this2 = _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, 'Request timed out'));

		_this2.name = 'TimeoutError';
		return _this2;
	}

	return TimeoutError;
}(Error);

var delay = function delay(ms) {
	return new Promise(function (resolve) {
		return setTimeout(resolve, ms);
	});
};

var timeout = function timeout(promise, ms) {
	return new Promise(function (resolve, reject) {
		promise.then(resolve, reject); // eslint-disable-line promise/prefer-await-to-then

		_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return delay(ms);

						case 2:
							reject(new TimeoutError());

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}))();
	});
};

var Ky = function () {
	function Ky(input, options) {
		var _this3 = this;

		_classCallCheck(this, Ky);

		this._input = input;
		this._retryCount = 0;

		this._options = _extends({
			method: 'get',
			credentials: 'same-origin', // TODO: This can be removed when the spec change is implemented in all browsers. Context: https://www.chromestatus.com/feature/4539473312350208
			retry: 3,
			timeout: 10000
		}, options);

		this._timeout = this._options.timeout;
		delete this._options.timeout;

		var headers = new window.Headers(this._options.headers || {});

		if (this._options.json) {
			headers.set('content-type', 'application/json');
			this._options.body = JSON.stringify(this._options.json);
			delete this._options.json;
		}

		this._options.headers = headers;

		this._response = this._fetch();

		var _loop = function _loop(type) {
			_this3._response[type] = _this3._retry(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (_this3._retryCount > 0) {
									_this3._response = _this3._fetch();
								}

								_context2.next = 3;
								return _this3._response;

							case 3:
								response = _context2.sent;

								if (response.ok) {
									_context2.next = 6;
									break;
								}

								throw new HTTPError(response);

							case 6:
								return _context2.abrupt('return', response.clone()[type]());

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this3);
			})));
		};

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = responseTypes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var type = _step3.value;

				_loop(type);
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		return this._response;
	}

	_createClass(Ky, [{
		key: '_retry',
		value: function _retry(fn) {
			var _this4 = this;

			if (!retryMethods.has(this._options.method.toLowerCase())) {
				return fn;
			}

			var retry = function () {
				var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
					var shouldRetryStatusCode, BACKOFF_FACTOR, delaySeconds;
					return regeneratorRuntime.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.prev = 0;
									_context3.next = 3;
									return fn();

								case 3:
									return _context3.abrupt('return', _context3.sent);

								case 6:
									_context3.prev = 6;
									_context3.t0 = _context3['catch'](0);
									shouldRetryStatusCode = _context3.t0 instanceof HTTPError ? retryStatusCodes.has(_context3.t0.response.status) : true;

									if (!(!(_context3.t0 instanceof TimeoutError) && shouldRetryStatusCode && _this4._retryCount < _this4._options.retry)) {
										_context3.next = 16;
										break;
									}

									_this4._retryCount++;
									BACKOFF_FACTOR = 0.3;
									delaySeconds = BACKOFF_FACTOR * Math.pow(2, _this4._retryCount - 1);
									_context3.next = 15;
									return delay(delaySeconds * 1000);

								case 15:
									return _context3.abrupt('return', retry());

								case 16:
									throw _context3.t0;

								case 17:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, _this4, [[0, 6]]);
				}));

				return function retry() {
					return _ref5.apply(this, arguments);
				};
			}();

			return retry;
		}
	}, {
		key: '_fetch',
		value: function _fetch() {
			return timeout(window.fetch(this._input, this._options), this._timeout);
		}
	}]);

	return Ky;
}();

var createInstance = function createInstance() {
	var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var ky = function ky(input, options) {
		return new Ky(input, deepMerge({}, defaults, options));
	};

	var _loop2 = function _loop2(method) {
		ky[method] = function (input, options) {
			return new Ky(input, deepMerge({}, defaults, options, { method: method }));
		};
	};

	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = requestMethods[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var method = _step4.value;

			_loop2(method);
		}
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}

	return ky;
};

module.exports = createInstance();
module.exports.extend = function (defaults) {
	return createInstance(defaults);
};
module.exports.HTTPError = HTTPError;
module.exports.TimeoutError = TimeoutError;
