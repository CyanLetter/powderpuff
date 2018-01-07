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

var _Effect = __webpack_require__(6);

var _Effect2 = _interopRequireDefault(_Effect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// default effect

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

			// active effect canvases to run
			this.activeEffects = [];

			this.resize();
			window.addEventListener('resize', function (e) {
				return _this.resize(e);
			});

			requestAnimationFrame(function (e) {
				return _this.update(e);
			});
		}
	}, {
		key: 'puff',
		value: function puff(effect, colors) {
			var newEffect = void 0;

			switch (effect) {
				case 'test':
					newEffect = new _Effect2.default(this);
					this.activeEffects.push(newEffect);
					break;
			}
		}
	}, {
		key: 'update',
		value: function update(timestamp) {
			var _this2 = this;

			for (var i = 0; i < this.activeEffects.length; i++) {
				this.activeEffects[i].update(timestamp);
				this.ctx.drawImage(this.activeEffects[i].canvas, 0, 0);
			}

			requestAnimationFrame(function (e) {
				return _this2.update(e);
			});
		}
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

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Base class for smoke effects


var _Particle = __webpack_require__(7);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Effect = function () {
	function Effect(parent, options) {
		_classCallCheck(this, Effect);

		options = options || {};

		this.parent = parent;
		this.framerate = options.framerate || 60;
		this.tick = 1000 / this.framerate;

		this.activeParticles = [];

		// render canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.canvas.height = this.parent.canvasSize;
		this.ctx = this.canvas.getContext("2d");
		// particle canvas
		this.pCanvas = document.createElement('canvas');
		this.pCanvas.width = this.pCanvas.height = this.parent.canvasSize;
		this.pctx = this.canvas.getContext("2d");

		this.init();
	}

	_createClass(Effect, [{
		key: 'init',
		value: function init() {
			for (var i = 0; i < 50; i++) {
				var newParticle = new _Particle2.default(this.pctx, {
					xPos: this.canvas.width / 2,
					yPos: this.canvas.width / 2,
					xVelocity: -20 + Math.random() * 40,
					yVelocity: -20 + Math.random() * 40,
					yForce: 0.4,
					drag: 0.02
				});
				this.activeParticles.push(newParticle);
			}
		}
	}, {
		key: 'update',
		value: function update(timestamp) {
			if (!this.startTime) {
				this.startTime = timestamp;
				this.lastTime = timestamp;
			}

			var dt = timestamp - this.lastTime;
			var timeScale = dt / this.tick;

			this.lastTime = timestamp;

			for (var i = this.activeParticles.length - 1; i >= 0; i--) {
				if (this.activeParticles[i].isDead) {
					this.activeParticles[i] = null;
					this.activeParticles.splice(i, 1);
				} else {
					this.activeParticles[i].update(dt, timeScale);
				}

				// check for destroy
			}

			this.ctx.drawImage(this.pCanvas, 0, 0);
		}
	}]);

	return Effect;
}();

exports.default = Effect;
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Base class for smoke particles


var _Ease = __webpack_require__(3);

var _Ease2 = _interopRequireDefault(_Ease);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
	function Particle(context, options) {
		_classCallCheck(this, Particle);

		options = options || {};

		// must have context to draw to
		this.ctx = context;

		// lifetime
		this.lifetime = options.lifetime || 1000;

		// track current position in lifetime
		this.currentTime = 0;

		this.isDead = false;

		this.position = {
			x: options.xPos || 0,
			y: options.yPos || 0
		};

		// velocity
		this.velocity = {
			x: options.xVelocity || 10,
			y: options.yVelocity || 0
		};

		// constant force acting on the particle
		this.force = {
			x: options.xForce || 0,
			y: options.yForce || 0
		};

		// size
		this.size = options.size || 50;

		// drag
		this.drag = options.drag || 0;

		this.currentColor = options.startColor || 'hsla(0, 100%, 50%, 0.01)';
		this.color = {
			start: options.startColor || '#ff0000',
			end: options.endColor || '#ff0000'
		};

		// not using this right now
		this.rotation = {
			start: options.startRotation || 0,
			end: options.endRotation || 6.28 // 2 radians
		};

		this.currentScale = options.startScale || 1;
		this.scale = {
			start: options.startScale || 1,
			end: options.endScale || 0
		};

		this.draw();
	}

	_createClass(Particle, [{
		key: 'draw',
		value: function draw() {
			this.ctx.fillStyle = this.currentColor;
			this.ctx.beginPath();
			this.ctx.arc(this.position.x, this.position.y, this.size * this.currentScale, 0, Math.PI * 2, false);
			this.ctx.fill();
		}
	}, {
		key: 'update',
		value: function update(dt, timeScale, noise) {
			this.currentTime += dt;
			this.percentComplete = this.currentTime / this.lifetime;
			if (this.percentComplete >= 1) {
				this.percentComplete = 1;
				this.isDead = true;
			}

			// update velocity
			this.velocity.x += this.force.x * timeScale;
			this.velocity.x *= 1 - this.drag * timeScale;
			this.velocity.y += this.force.y * timeScale;
			this.velocity.y *= 1 - this.drag * timeScale;

			// update position
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;

			// update color and scale
			// this.currentColor = Ease.lerp(this.color.start, this.color.end, this.percentComplete);
			this.currentScale = _Ease2.default.lerp(this.scale.start, this.scale.end, this.percentComplete);

			this.draw();
		}
	}]);

	return Particle;
}();

exports.default = Particle;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Powderpuff.js.map