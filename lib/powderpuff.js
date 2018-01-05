(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Powderpuff", [], factory);
	else if(typeof exports === 'object')
		exports["Powderpuff"] = factory();
	else
		root["Powderpuff"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Powderpuff = __webpack_require__(2);

var _Powderpuff2 = _interopRequireDefault(_Powderpuff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Powderpuff2.default;
module.exports = exports['default'];

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ease = __webpack_require__(3);

var _Ease2 = _interopRequireDefault(_Ease);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Powderpuff = function () {
	function Powderpuff(options) {
		_classCallCheck(this, Powderpuff);

		options = options || {};

		this.container = options.container;

		// dimensions of the canvas to create. Canvas is always a square for now
		this.canvasSize = options.canvasSize || 2000;

		this.debug = options.debug;

		this.init();
	}

	_createClass(Powderpuff, [{
		key: 'init',
		value: function init() {
			var _this = this;

			console.log('powdering...');

			if (typeof this.container === 'undefined') {
				// generate our own container
				this.container = document.createElement('div');
				this.container.style = 'position: fixed; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;';

				document.body.insertBefore(this.container, document.body.firstChild);
			}

			// create our canvas
			this.canvas = document.createElement('canvas');
			this.canvas.width = this.canvas.height = this.canvasSize;
			this.canvas.style = 'position: absolute; top: 50%; left: 50%;';
			this.container.appendChild(this.canvas);

			// get main canvas context
			this.ctx = this.canvas.getContext('2d');

			// add registration marks for debugging
			if (this.debug === true) {
				this.ctx.fillStyle = 'red';
				this.ctx.strokeStyle = 'red';

				this.ctx.beginPath();
				this.ctx.moveTo(50, 50);
				this.ctx.lineTo(1950, 1950);
				this.ctx.stroke();

				this.ctx.beginPath();
				this.ctx.moveTo(1950, 50);
				this.ctx.lineTo(50, 1950);
				this.ctx.stroke();
				// tl
				this.ctx.beginPath();
				this.ctx.arc(50, 50, 50, 0, Math.PI * 2, false);
				this.ctx.fill();
				// tr
				this.ctx.beginPath();
				this.ctx.arc(this.canvasSize - 50, 50, 50, 0, Math.PI * 2, false);
				this.ctx.fill();
				// bl
				this.ctx.beginPath();
				this.ctx.arc(50, this.canvasSize - 50, 50, 0, Math.PI * 2, false);
				this.ctx.fill();
				// br
				this.ctx.beginPath();
				this.ctx.arc(this.canvasSize - 50, this.canvasSize - 50, 50, 0, Math.PI * 2, false);
				this.ctx.fill();
				// ctr
				this.ctx.beginPath();
				this.ctx.arc(this.canvasSize / 2, this.canvasSize / 2, 50, 0, Math.PI * 2, false);
				this.ctx.fill();
			}

			this.resize();
			window.addEventListener('resize', function (e) {
				return _this.resize(e);
			});
		}
	}, {
		key: 'update',
		value: function update() {}
	}, {
		key: 'resize',
		value: function resize() {
			// resize canvas to center cut
			var width = window.innerWidth;
			var height = window.innerHeight;
			var aspect = width / height;
			var scale = 1;

			if (aspect >= 1) {
				// landscape, make width match
				scale = width / this.canvasSize;
			} else {
				// portrait, make height match
				scale = height / this.canvasSize;
			}

			var newTransform = 'translate(-50%, -50%) scale(' + scale + ')';

			this.canvas.style.transform = newTransform;
		}
	}]);

	return Powderpuff;
}();

exports.default = Powderpuff;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ease = function () {
	function Ease() {
		_classCallCheck(this, Ease);
	}

	_createClass(Ease, null, [{
		key: "lerp",
		value: function lerp(value1, value2, amount) {
			return (1 - amount) * value1 + amount * value2;
		}
	}]);

	return Ease;
}();

exports.default = Ease;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Powderpuff.js.map