(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("flowchart", [], factory);
	else if(typeof exports === 'object')
		exports["flowchart"] = factory();
	else
		root["flowchart"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Selector = function () {
  function Selector($el) {
    _classCallCheck(this, Selector);

    this.$el = $el;
    return this;
  }

  _createClass(Selector, [{
    key: 'select',
    value: function select(selector) {
      if (selector instanceof HTMLElement) {
        return selector;
      }
      var $el = document.querySelector(selector);
      return new Selector($el);
    }
  }, {
    key: 'append',
    value: function append(el) {
      var $el = el instanceof HTMLElement ? el : document.createElementNS(Selector.namespace, el);
      this.$el.appendChild($el);
      return new Selector($el);
    }
  }, {
    key: 'attr',
    value: function attr(attribute, value) {
      this.$el.setAttribute(attribute, value);
      return this;
    }
  }, {
    key: 'on',
    value: function on(event, listener) {
      var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.$el.addEventListenr(event, listener, useCapture);
      return this;
    }
  }, {
    key: 'off',
    value: function off(event, listener) {
      var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.$el.removeEventListenr(event, listener, useCapture);
    }
  }]);

  return Selector;
}();

Selector.namespace = 'http://www.w3.org/2000/svg';
exports.default = Selector;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _format = __webpack_require__(4);

var _format2 = _interopRequireDefault(_format);

var _cloneDeep = __webpack_require__(3);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  format: _format2.default,
  cloneDeep: _cloneDeep2.default
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _selector = __webpack_require__(0);

var _selector2 = _interopRequireDefault(_selector);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flowchart = function (_Selector) {
  _inherits(Flowchart, _Selector);

  function Flowchart(selector) {
    var _ret;

    _classCallCheck(this, Flowchart);

    var _this = _possibleConstructorReturn(this, (Flowchart.__proto__ || Object.getPrototypeOf(Flowchart)).call(this));

    _this.$el = null;
    _this.$data = null;

    var $selector = _this.select(selector);
    var $el = $selector.append('svg').attr('width', $selector.$el.offsetWidth).attr('height', $selector.$el.offsetHeight);
    _this.$el = $el;
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Flowchart, [{
    key: 'data',
    value: function data(_data) {
      this.$data = (0, _utils.format)(_data);
      return this;
    }
  }, {
    key: 'render',
    value: function render(data) {
      this.$el.append('g').append('rect').attr('x', 300).attr('y', 200).attr('width', 40).attr('height', 40).attr('fill', 'pink');
      return this;
    }
  }]);

  return Flowchart;
}(_selector2.default);

Flowchart.version = "0.0.1";
exports.default = Flowchart;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (object) {
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
    return object;
  }
  var obj = Object.create(object.constructor);
  for (var key in object) {
    obj[key] = object[key];
  }
  return obj;
};

;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var nodes = data.map(function (node) {
    for (var i = 0, length = data.length; i < length; i++) {
      var pIndex = node.prev.indexOf(data[i].id);
      if (pIndex !== -1) {
        node.prev[pIndex] = data[i];
      }
      var nIndex = node.next.indexOf(data[i].id);
      if (nIndex !== -1) {
        node.next[nIndex] = data[i];
      }
    }
    return node;
  });
  for (var i = 0, length = nodes.length; i < length; i++) {
    if (!nodes[i].prev.length) {
      return nodes[i];
    }
  }
};

module.exports = exports["default"]; // 把数据转化为开始节点对象

/***/ })
/******/ ]);
});
//# sourceMappingURL=flowchart.js.map