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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Base class for smoke effects


var _Ease = __webpack_require__(2);

var _Ease2 = _interopRequireDefault(_Ease);

var _Particle = __webpack_require__(1);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import FastBlur from '../FastBlur.js';

var Effect = function () {
	function Effect(parent, options) {
		var _this = this;

		_classCallCheck(this, Effect);

		options = options || {};

		this.parent = parent;

		this.theme = options.theme || this.parent.themes.meteor;

		this.activeParticles = [];

		// controls for particle canvas movement
		// lifetime
		this.lifetime = options.lifetime || 1000;
		this.currentTime = 0;
		this.isDead = false;

		// position
		this.position = {
			x: options.xPos || 0,
			y: options.yPos || 0
		};

		// velocity
		this.velocity = {
			x: options.xVelocity || 0,
			y: options.yVelocity || 0
		};

		// scale
		this.currentScale = options.startScale || 1;
		this.scale = {
			start: options.startScale || 1,
			end: options.endScale || 1
		};

		this.delay = options.delay || 0;

		// render canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.canvas.height = this.parent.canvasSize;
		this.ctx = this.canvas.getContext('2d');

		// this.ctx.fillStyle = '#ffffff';
		// this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
		// particle canvas
		this.pCanvas = document.createElement('canvas');
		this.pCanvas.width = this.pCanvas.height = this.parent.canvasSize;
		this.pctx = this.pCanvas.getContext('2d');

		this.startDelay = setTimeout(function () {
			return _this.init();
		}, this.delay);
	}

	_createClass(Effect, [{
		key: 'init',
		value: function init() {
			for (var i = 0; i < 50; i++) {
				var randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
				var newParticle = new _Particle2.default(this.pctx, {
					lifetime: 1000,
					size: 50,
					xPos: this.parent.canvasSize / 2 - 40 + Math.random() * 80,
					yPos: this.parent.canvasSize / 2 - 40 + Math.random() * 80,
					xVelocity: -20 + Math.random() * 40,
					yVelocity: -20 + Math.random() * 40,
					drag: 0.02,
					startColor: randColor.start,
					endColor: randColor.end,
					noiseType: 'random',
					noiseAmount: 10
				});

				this.activeParticles.push(newParticle);
			}
		}
	}, {
		key: 'update',
		value: function update(dt) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.pctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			this.currentTime += dt;
			this.percentComplete = this.currentTime / this.lifetime;
			if (this.percentComplete >= 1) {
				this.percentComplete = 1;
				this.isDead = true;
			}

			// console.log(this.activeParticles.length);
			for (var i = this.activeParticles.length - 1; i >= 0; i--) {
				if (this.activeParticles[i].isDead) {
					this.activeParticles[i] = null;
					this.activeParticles.splice(i, 1);
				} else {
					this.activeParticles[i].update(dt);
				}
			}

			// update canvas positions
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			this.currentScale = _Ease2.default.lerp(this.scale.start, this.scale.end, this.percentComplete, _Ease2.default.easeOutQuad);
			var canvasDims = this.scaleDrawable(this.canvas.width, this.canvas.height, this.currentScale);

			this.ctx.drawImage(this.pCanvas, canvasDims.x + this.position.x, canvasDims.y + this.position.y, canvasDims.width, canvasDims.height);

			// this.ctx.globalCompositeOperation = 'source-out';
			// FastBlur.extremeFractalBlur(this.canvas, this.ctx, 4);
			// this.ctx.globalCompositeOperation = 'source-over';
		}
	}, {
		key: 'scaleDrawable',
		value: function scaleDrawable(w, h, scale) {
			// return scale values that can be used in drawImage operations
			return {
				x: (scale * w - w) * -0.5,
				y: (scale * h - h) * -0.5,
				width: scale * w,
				height: scale * h
			};
		}
	}]);

	return Effect;
}();

exports.default = Effect;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Base class for smoke particles


var _Ease = __webpack_require__(2);

var _Ease2 = _interopRequireDefault(_Ease);

var _Noise = __webpack_require__(3);

var _Noise2 = _interopRequireDefault(_Noise);

var _Color = __webpack_require__(4);

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
			x: options.xVelocity || 0,
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

		this.color = new _Color.Color(options.startColor || 'hsla(0, 100%, 50%, 0.01)', options.endColor || 'hsla(0, 100%, 50%, 0.01)');
		this.currentColor = this.color.lerp(0);

		this.rotation = options.rotation || 0;
		this.angularVelocity = options.angularVelocity || 0;

		this.offset = {
			x: options.offsetX || 0,
			y: options.offsetY || 0
		}; // how far away from center pivot point the particle is

		this.currentScale = options.startScale || 1;
		this.scale = {
			start: options.startScale || 1,
			end: options.endScale || 0
		};

		this.noiseType = options.noiseType || 'none';
		this.noiseAmount = options.noiseAmount || 0;
	}

	_createClass(Particle, [{
		key: 'move',
		value: function move(noise) {

			// update velocity
			this.velocity.x += this.force.x;
			this.velocity.x *= 1 - this.drag;
			this.velocity.y += this.force.y;
			this.velocity.y *= 1 - this.drag;

			this.rotation += this.angularVelocity;
			this.angularVelocity *= 1 - this.drag;

			// update position
			this.position.x += this.velocity.x + noise.x;
			this.position.y += this.velocity.y + noise.y;

			this.applyNoise();

			// update color and scale
			this.currentColor = this.color.lerp(this.percentComplete);
			this.currentScale = _Ease2.default.lerp(this.scale.start, this.scale.end, this.percentComplete);

			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			this.ctx.fillStyle = this.currentColor;
			if (this.rotation !== 0) {
				this.ctx.translate(this.position.x, this.position.y);
				this.ctx.rotate(this.rotation * Math.PI / 180);
				this.ctx.beginPath();
				this.ctx.arc(0 - this.size / 2 + this.offset.x, 0 - this.size / 2 + this.offset.y, this.size * this.currentScale, 0, 6.28, false);
				this.ctx.fill();
				this.ctx.setTransform(1, 0, 0, 1, 0, 0);
			} else {
				this.ctx.beginPath();
				this.ctx.arc(this.position.x, this.position.y, this.size * this.currentScale, 0, 6.28, false);
				this.ctx.fill();
			}
		}
	}, {
		key: 'applyNoise',
		value: function applyNoise() {
			switch (this.noiseType) {
				case 'none':
					// do nothing
					break;
				case 'random':
					var newNoise = _Noise2.default.random(this.noiseAmount);

					this.position.x += newNoise.x;
					this.position.y += newNoise.y;
					break;
			}
		}
	}, {
		key: 'update',
		value: function update(dt, noise) {
			this.currentTime += dt;
			this.percentComplete = this.currentTime / this.lifetime;
			if (this.percentComplete >= 1) {
				this.percentComplete = 1;
				this.isDead = true;
			}
			noise = noise || { x: 0, y: 0 };

			this.move(noise);
		}
	}]);

	return Particle;
}();

exports.default = Particle;
module.exports = exports['default'];

/***/ }),
/* 2 */
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
		value: function lerp(value1, value2, t, ease) {
			if (ease) {
				t = ease(t);
			}
			return (1 - t) * value1 + t * value2;
		}
	}, {
		key: "easeOutQuad",
		value: function easeOutQuad(t) {
			return t * (2 - t);
		}
	}]);

	return Ease;
}();

exports.default = Ease;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Noise = function () {
	function Noise() {
		_classCallCheck(this, Noise);
	}

	_createClass(Noise, null, [{
		key: "random",
		value: function random(amount) {
			return {
				x: -amount + Math.random() * (amount * 2),
				y: -amount + Math.random() * (amount * 2)
			};
		}

		// perlin

		//brownian

	}]);

	return Noise;
}();

exports.default = Noise;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ColorThemes = exports.Color = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Ease = __webpack_require__(2);

var _Ease2 = _interopRequireDefault(_Ease);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = exports.Color = function () {
	function Color(startColor, endColor) {
		_classCallCheck(this, Color);

		// assume same format for start and end colors
		this.colorType = this.getColorType(startColor);
		this.startColor = this.decomposeColor(startColor);
		this.endColor = this.decomposeColor(endColor);
	}

	_createClass(Color, [{
		key: 'lerp',
		value: function lerp(t) {

			var lerpColor = {
				x: _Ease2.default.lerp(this.startColor.x, this.endColor.x, t),
				y: _Ease2.default.lerp(this.startColor.y, this.endColor.y, t),
				z: _Ease2.default.lerp(this.startColor.z, this.endColor.z, t),
				a: _Ease2.default.lerp(this.startColor.a, this.endColor.a, t)
			};

			// console.log(lerpColor.x);
			lerpColor = this.recomposeColor(lerpColor);

			return lerpColor;
		}

		// extract values from both rgba and hsla
		// always convert to individual generic xyza values

	}, {
		key: 'decomposeColor',
		value: function decomposeColor(color) {
			var colorRegex = new RegExp(/\((-?\d\d?\d?),\s?(\d\d?\d?)%?,\s?(\d\d?\d?)%?,\s?(\d\.?\d?\d?\d?)\)/, 'i');
			var decomposed = color.match(colorRegex);
			// console.log(decomposed);

			return {
				x: decomposed[1],
				y: decomposed[2],
				z: decomposed[3],
				a: decomposed[4]
			};
		}
	}, {
		key: 'recomposeColor',
		value: function recomposeColor(color) {
			switch (this.colorType) {
				case 'hex':
					// TODO: Handle Hex
					return '#ff0000';
				case 'rgba':
					return 'rgba(' + color.x + ', ' + color.y + ', ' + color.z + ', ' + color.a + ')';
				case 'hsl':
					return 'hsla(' + color.x + ', ' + color.y + '%, ' + color.z + '%, ' + color.a + ')';
				default:
					return null;
			}
		}
	}, {
		key: 'getColorType',
		value: function getColorType(color) {
			switch (color[0]) {
				case '#':
					return 'hex';
				case 'r':
					return 'rgba';
				case 'h':
					return 'hsl';
				default:
					return null;
			}
		}
	}]);

	return Color;
}();

var ColorThemes = exports.ColorThemes = function () {
	function ColorThemes() {
		_classCallCheck(this, ColorThemes);
	}

	_createClass(ColorThemes, null, [{
		key: 'meteor',
		get: function get() {
			return [{ // brown
				start: 'hsla(27, 38%, 30%, 1)',
				end: 'hsla(27, 38%, 15%, 1)'
			}, { // magenta
				start: 'hsla(330, 100%, 50%, 1)',
				end: 'hsla(350, 80%, 50%, 1)'
			}, { // red-orange
				start: 'hsla(0, 100%, 58%, 1)',
				end: 'hsla(20, 100%, 45%, 1)'
			}, { // yellow
				start: 'hsla(52, 100%, 50%, 1)',
				end: 'hsla(40, 100%, 45%, 1)'
			}];
		}
	}, {
		key: 'bahamas',
		get: function get() {
			return [{ // blue-aqua
				start: 'hsla(176, 100%, 48%, 1)',
				end: 'hsla(158, 100%, 48%, 1)'
			}, { // aqua-green
				start: 'hsla(158, 100%, 48%, 1)',
				end: 'hsla(144, 80%, 48%, 1)'
			}, { // yellow-green
				start: 'hsla(71, 100%, 45%, 1)',
				end: 'hsla(58, 100%, 61%, 1)'
			}, { // yellow-orange
				start: 'hsla(54, 91%, 51%, 1)',
				end: 'hsla(39, 100%, 55%, 1)'
			}, { // deep blue
				start: 'hsla(202, 100%, 47%, 1)',
				end: 'hsla(222, 90%, 60%, 1)'
			}];
		}
	}, {
		key: 'winter',
		get: function get() {
			return [{ // ice ice baby
				start: 'hsla(201, 39%, 77%, 1)',
				end: 'hsla(185, 50%, 65%, 1)'
			}, { // turn around bright ice
				start: 'hsla(181, 100%, 77%, 1)',
				end: 'hsla(168, 100%, 85%, 1)'
			}, { // grey-test song in the world
				start: 'hsla(174, 5%, 62%, 1)',
				end: 'hsla(174, 5%, 100%, 1)'
			}, { // dark blue dark blue
				start: 'hsla(202, 54%, 61%, 1)',
				end: 'hsla(214, 76%, 78%, 1)'
			}];
		}
	}, {
		key: 'solar',
		get: function get() {
			return [{ // orange
				start: 'hsla(25, 100%, 50%, 1)',
				end: 'hsla(27, 100%, 60%, 1)'
			}, { // burnt sienna
				start: 'hsla(17, 100%, 35%, 1)',
				end: 'hsla(10, 100%, 30%, 1)'
			}, { // red blood cell
				start: 'hsla(0, 76%, 23%, 1)',
				end: 'hsla(0, 100%, 35%, 1)'
			}, { // bright red
				start: 'hsla(0, 81%, 47%, 1)',
				end: 'hsla(11, 100%, 40%, 1)'
			}, { // yellow
				start: 'hsla(46, 100%, 50%, 1)',
				end: 'hsla(42, 100%, 65%, 1)'
			}];
		}
	}, {
		key: 'random',
		get: function get() {
			var rand = Math.random();
			if (rand < 0.25) {
				return this.meteor;
			} else if (rand < 0.5) {
				return this.bahamas;
			} else if (rand < 0.75) {
				return this.winter;
			} else {
				return this.solar;
			}
		}
	}]);

	return ColorThemes;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle2 = __webpack_require__(1);

var _Particle3 = _interopRequireDefault(_Particle2);

var _Ease = __webpack_require__(2);

var _Ease2 = _interopRequireDefault(_Ease);

var _Noise = __webpack_require__(3);

var _Noise2 = _interopRequireDefault(_Noise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // wispy tendril particle, inspired by Mustafa: https://codepen.io/shadowman86/pen/EDBiC?page=3


var Wisp = function (_Particle) {
	_inherits(Wisp, _Particle);

	function Wisp(context, options) {
		_classCallCheck(this, Wisp);

		// length of the line
		var _this = _possibleConstructorReturn(this, (Wisp.__proto__ || Object.getPrototypeOf(Wisp)).call(this, context, options));

		_this.length = options.length || 30;

		// line weight
		_this.thickness = options.thickness || 1;

		_this.frequency = {
			head: options.headFreq || 0.1,
			tail: options.tailFreq || 0.1
		};

		_this.amplitude = {
			head: options.headAmp || 1,
			tail: options.tailAmp || 1
		};

		_this.currentWavePos = {
			head: 0,
			tail: 0
		};

		_this.tailPos = {
			x: _this.position.x + Math.sin(_this.rotation.start) * _this.length,
			y: _this.position.y + Math.cos(_this.rotation.start) * _this.length
		};
		return _this;
	}

	_createClass(Wisp, [{
		key: 'move',
		value: function move(noise) {
			// update velocity
			this.velocity.x += this.force.x;
			this.velocity.x *= 1 - this.drag;
			this.velocity.y += this.force.y;
			this.velocity.y *= 1 - this.drag;

			// update position
			this.position.x += this.velocity.x + noise.x;
			this.position.y += this.velocity.y + noise.y;
			this.tailPos.x += this.velocity.x + noise.x;
			this.tailPos.y += this.velocity.y + noise.y;

			this.applyNoise();

			// update color and scale
			this.currentColor = this.color.lerp(this.percentComplete);
			this.currentScale = _Ease2.default.lerp(this.scale.start, this.scale.end, this.percentComplete);

			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			// console.log(this.tailPos.x);
			this.ctx.strokeStyle = this.currentColor;
			this.ctx.lineWidth = this.thickness;
			this.ctx.lineCap = 'round';
			this.ctx.beginPath();
			this.ctx.moveTo(this.tailPos.x, this.tailPos.y);
			this.ctx.lineTo(this.position.x, this.position.y);
			this.ctx.stroke();
		}
	}, {
		key: 'applyNoise',
		value: function applyNoise() {
			switch (this.noiseType) {
				case 'none':
					// do nothing
					break;
				case 'random':
					var newNoise = _Noise2.default.random(this.noiseAmount);

					this.position.x += newNoise.x;
					this.position.y += newNoise.y;

					var newNoise2 = _Noise2.default.random(this.noiseAmount);

					this.tailPos.x += newNoise2.x;
					this.tailPos.y += newNoise2.y;
					break;
				case 'wave':
					this.currentWavePos.head += this.frequency.head;
					this.currentWavePos.tail += this.frequency.tail;

					this.position.x += Math.sin(this.currentWavePos.head) * this.amplitude.head;
					this.position.y += Math.cos(this.currentWavePos.head) * this.amplitude.head;

					this.tailPos.x += Math.cos(this.currentWavePos.tail) * this.amplitude.tail;
					this.tailPos.y += Math.sin(this.currentWavePos.tail) * this.amplitude.tail;
					break;
			}
		}
	}]);

	return Wisp;
}(_Particle3.default);

exports.default = Wisp;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FastBlur = function () {
	function FastBlur() {
		_classCallCheck(this, FastBlur);
	}

	_createClass(FastBlur, null, [{
		key: "extremeFractalBlur",
		value: function extremeFractalBlur(a, aCtx, iterations) {
			var x = 0;
			var y = 0;

			aCtx.globalAlpha = 0.2;
			var dirSeed = iterations < 4 ? Math.floor(Math.random() * 4) : 0;
			for (var i = 0; i < iterations; ++i) {
				var direction = (dirSeed + i) % 4;
				var offset = Math.floor(i / 4) * 4 + 1;

				switch (direction) {
					case 0:
						// Up.
						y -= offset;
						break;
					case 1:
						// Right.
						x += offset;
						break;
					case 2:
						// Down.
						y += offset;
						break;
					case 3:
						// Left.
						x -= offset;
						break;
				}
				aCtx.drawImage(a, x, y);
			}
			aCtx.globalAlpha = 1;
		}
	}]);

	return FastBlur;
}();

exports.default = FastBlur;
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Powderpuff = __webpack_require__(8);

var _Powderpuff2 = _interopRequireDefault(_Powderpuff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Powderpuff2.default;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // default effect
// color bursts
// Wisp default effect
// Wisp ribbon effect
// Concentric ring effect
// line arc bend thing
// Background clear effect


var _Effect = __webpack_require__(0);

var _Effect2 = _interopRequireDefault(_Effect);

var _PrismaFlak = __webpack_require__(9);

var _PrismaFlak2 = _interopRequireDefault(_PrismaFlak);

var _WispTest = __webpack_require__(10);

var _WispTest2 = _interopRequireDefault(_WispTest);

var _Ribbons = __webpack_require__(11);

var _Ribbons2 = _interopRequireDefault(_Ribbons);

var _Radial = __webpack_require__(12);

var _Radial2 = _interopRequireDefault(_Radial);

var _Mandela = __webpack_require__(14);

var _Mandela2 = _interopRequireDefault(_Mandela);

var _ClearToColor = __webpack_require__(15);

var _ClearToColor2 = _interopRequireDefault(_ClearToColor);

var _FastBlur = __webpack_require__(6);

var _FastBlur2 = _interopRequireDefault(_FastBlur);

var _Utilities = __webpack_require__(16);

var _Utilities2 = _interopRequireDefault(_Utilities);

var _Color = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Powderpuff = function () {
	function Powderpuff(options) {
		_classCallCheck(this, Powderpuff);

		options = options || {};

		this.container = options.container;

		// dimensions of the canvas to create. Canvas is always a square for now
		this.canvasSize = options.canvasSize || 1024;

		this.framerate = options.framerate || 60;
		this.tickrate = 1000 / this.framerate;
		this.currentDt = 0;

		this.debug = options.debug;

		this.themes = _Color.ColorThemes;

		this.blurAmount = 0;

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
				this.container.style.position = 'fixed';
				this.container.style.top = '0';
				this.container.style.right = '0';
				this.container.style.bottom = '0';
				this.container.style.left = '0';
				this.container.style.overflow = 'hidden';

				document.body.insertBefore(this.container, document.body.firstChild);
			}

			// create our canvas
			this.canvas = document.createElement('canvas');
			this.canvas.width = this.canvas.height = this.canvasSize;
			this.canvas.style.position = 'absolute';
			this.canvas.style.top = '50%';
			this.canvas.style.left = '50%';
			this.container.appendChild(this.canvas);

			// get main canvas context
			this.ctx = this.canvas.getContext('2d');
			this.ctx.fillStyle = '#ffffff';
			this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
			// this.ctx.globalCompositeOperation = 'multiply';

			// add registration marks for debugging
			if (this.debug === true) {
				this.ctx.fillStyle = 'red';
				this.ctx.strokeStyle = 'red';

				this.ctx.beginPath();
				this.ctx.moveTo(50, 50);
				this.ctx.lineTo(this.canvasSize - 50, this.canvasSize - 50);
				this.ctx.stroke();

				this.ctx.beginPath();
				this.ctx.moveTo(this.canvasSize - 50, 50);
				this.ctx.lineTo(50, this.canvasSize - 50);
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
		value: function puff(effect, theme) {
			var newEffect = void 0;
			var clearEffect = void 0;

			if (typeof theme === 'undefined') {
				theme = this.themes.meteor;
			}
			_Utilities2.default.shuffle(theme);

			switch (effect) {
				case 'default':
					clearEffect = new _ClearToColor2.default(this, {
						lifetime: 500,
						color: 'hsla(0, 0%, 0%, 1)'
						// color: theme[Math.floor(Math.random() * theme.length)].end
					});
					newEffect = new _Effect2.default(this, {
						lifetime: 3000,
						endScale: 1.5,
						delay: 500,
						theme: theme
					});
					this.blurAmount = 4;

					break;
				case 'flak':
					newEffect = new _PrismaFlak2.default(this, {
						lifetime: 3000,
						endScale: 1.2,
						theme: theme
					});
					this.blurAmount = 4;

					break;
				case 'ribbons':
					newEffect = new _Ribbons2.default(this, {
						lifetime: 8000,
						endScale: 2,
						theme: theme
					});
					this.blurAmount = 4;

					break;
				case 'radial':
					clearEffect = new _ClearToColor2.default(this, {
						lifetime: 500,
						color: 'hsla(0, 0%, 0%, 1)'
						// color: theme[Math.floor(Math.random() * theme.length)].end
					});
					newEffect = new _Radial2.default(this, {
						lifetime: 3500,
						endScale: 1,
						delay: 500,
						theme: theme
					});
					this.blurAmount = 1;

					break;
				case 'mandela':
					clearEffect = new _ClearToColor2.default(this, {
						lifetime: 500,
						color: 'hsla(0, 0%, 0%, 1)'
						// color: theme[Math.floor(Math.random() * theme.length)].end
					});
					newEffect = new _Mandela2.default(this, {
						lifetime: 6000,
						endScale: 1,
						delay: 500,
						theme: theme
					});
					this.blurAmount = 4;

					break;
				case 'clear':
					clearEffect = new _ClearToColor2.default(this, {
						lifetime: 500
					});
					this.blurAmount = 4;

					break;
			}

			if (typeof clearEffect !== 'undefined') {
				this.activeEffects.push(clearEffect);
			}
			if (typeof newEffect !== 'undefined') {
				this.activeEffects.push(newEffect);
			}
		}
	}, {
		key: 'update',
		value: function update(timestamp) {
			var _this2 = this;

			if (!this.lastTime) {
				this.lastTime = timestamp;
			}

			// this.currentDt += (timestamp - this.lastTime);
			// console.log('delta: ' + (timestamp - this.lastTime) + 'dt: ' + this.currentDt);
			// this.currentDt -= this.tickrate;

			// update effects
			for (var i = 0; i < this.activeEffects.length; i++) {
				this.activeEffects[i].update(this.tickrate);
				this.ctx.drawImage(this.activeEffects[i].canvas, 0, 0);
			}

			if (this.activeEffects.length > 0 && this.blurAmount > 0) {
				_FastBlur2.default.extremeFractalBlur(this.canvas, this.ctx, this.blurAmount);
			}

			// remove dead effects
			for (var _i = this.activeEffects.length - 1; _i >= 0; _i--) {
				if (this.activeEffects[_i].isDead) {
					this.activeEffects[_i] = null;
					this.activeEffects.splice(_i, 1);
				}
			}

			this.lastTime = timestamp;
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Effect2 = __webpack_require__(0);

var _Effect3 = _interopRequireDefault(_Effect2);

var _Particle = __webpack_require__(1);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Colorful Flak Burst effect


var PrismaFlak = function (_Effect) {
	_inherits(PrismaFlak, _Effect);

	function PrismaFlak(parent, options) {
		_classCallCheck(this, PrismaFlak);

		return _possibleConstructorReturn(this, (PrismaFlak.__proto__ || Object.getPrototypeOf(PrismaFlak)).call(this, parent, options));
	}

	_createClass(PrismaFlak, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			this.interval = setInterval(function () {
				return _this2.burst();
			}, 100);

			setTimeout(function () {
				return _this2.end();
			}, 3000);
		}
	}, {
		key: 'burst',
		value: function burst() {
			var centerX = Math.random() * this.canvas.width;
			var centerY = Math.random() * this.canvas.width;
			// let initialColor = Math.floor(Math.random() * 360);
			var randStart = this.theme[Math.floor(Math.random() * this.theme.length)].start;
			var randEnd = this.theme[Math.floor(Math.random() * this.theme.length)].end;

			for (var i = 0; i < 50; i++) {
				var newParticle = new _Particle2.default(this.pctx, {
					lifetime: 500,
					size: 50,
					xPos: centerX - 40 + Math.random() * 80,
					yPos: centerY - 40 + Math.random() * 80,
					xVelocity: -40 + Math.random() * 80,
					yVelocity: -40 + Math.random() * 80,
					// yForce: 0.4,
					drag: 0.1,
					startColor: randStart,
					endColor: randEnd,
					noiseType: 'random',
					noiseAmount: 10
				});

				this.activeParticles.push(newParticle);
			}
		}
	}, {
		key: 'end',
		value: function end() {
			clearInterval(this.interval);
		}
	}]);

	return PrismaFlak;
}(_Effect3.default);

exports.default = PrismaFlak;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Effect2 = __webpack_require__(0);

var _Effect3 = _interopRequireDefault(_Effect2);

var _Wisp = __webpack_require__(5);

var _Wisp2 = _interopRequireDefault(_Wisp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Wisp Particle test effect


var WispTest = function (_Effect) {
	_inherits(WispTest, _Effect);

	function WispTest(parent, options) {
		_classCallCheck(this, WispTest);

		return _possibleConstructorReturn(this, (WispTest.__proto__ || Object.getPrototypeOf(WispTest)).call(this, parent, options));
	}

	_createClass(WispTest, [{
		key: 'init',
		value: function init() {
			var randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
			var newParticle = new _Wisp2.default(this.pctx, {
				lifetime: 5000,
				size: 50,
				xPos: 0,
				yPos: this.parent.canvasSize / 2,
				xVelocity: 3,
				// yVelocity: -3,
				startRotation: 6.28 * 0.75,
				startColor: randColor.start,
				endColor: randColor.end,
				noiseType: 'wave',
				noiseAmount: 10,
				length: 100,
				thickness: 10,
				tailFreq: 0.05,
				tailAmp: 3
			});

			this.activeParticles.push(newParticle);
		}
	}, {
		key: 'update',
		value: function update(timestamp) {
			_get(WispTest.prototype.__proto__ || Object.getPrototypeOf(WispTest.prototype), 'update', this).call(this, timestamp);

			// FastBlur.boxBlurCanvasRGBA(this.ctx, 0, 0, this.parent.canvasSize, this.parent.canvasSize, 5, 1);
			// FastBlur.extremeFractalBlur(this.canvas, this.ctx, 4);
		}
	}]);

	return WispTest;
}(_Effect3.default);

exports.default = WispTest;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Effect2 = __webpack_require__(0);

var _Effect3 = _interopRequireDefault(_Effect2);

var _Wisp = __webpack_require__(5);

var _Wisp2 = _interopRequireDefault(_Wisp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Wisps flying across screen


var Ribbons = function (_Effect) {
	_inherits(Ribbons, _Effect);

	function Ribbons(parent, options) {
		_classCallCheck(this, Ribbons);

		return _possibleConstructorReturn(this, (Ribbons.__proto__ || Object.getPrototypeOf(Ribbons)).call(this, parent, options));
	}

	_createClass(Ribbons, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			this.makeWisp(0);
			setTimeout(function () {
				return _this2.makeWisp(1);
			}, 200);
			setTimeout(function () {
				return _this2.makeWisp(2);
			}, 400);
		}
	}, {
		key: 'makeWisp',
		value: function makeWisp(num) {
			var newParticle = new _Wisp2.default(this.pctx, {
				lifetime: 1500,
				size: 50,
				xPos: 0,
				yPos: this.parent.canvasSize / 4 * (num + 1),
				xVelocity: 15,
				// yVelocity: -3,
				startRotation: 6.28 * 0.75,
				startColor: this.theme[num].start,
				endColor: this.theme[num].end,
				noiseType: 'wave',
				noiseAmount: 10,
				length: 100,
				thickness: 30,
				tailFreq: 0.05,
				tailAmp: 1
			});

			this.activeParticles.push(newParticle);
		}
	}, {
		key: 'update',
		value: function update(timestamp) {
			_get(Ribbons.prototype.__proto__ || Object.getPrototypeOf(Ribbons.prototype), 'update', this).call(this, timestamp);

			// FastBlur.boxBlurCanvasRGBA(this.ctx, 0, 0, this.parent.canvasSize, this.parent.canvasSize, 5, 1);
			// FastBlur.extremeFractalBlur(this.canvas, this.ctx, 4);
		}
	}]);

	return Ribbons;
}(_Effect3.default);

exports.default = Ribbons;
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Effect2 = __webpack_require__(0);

var _Effect3 = _interopRequireDefault(_Effect2);

var _Particle = __webpack_require__(1);

var _Particle2 = _interopRequireDefault(_Particle);

var _Box = __webpack_require__(13);

var _Box2 = _interopRequireDefault(_Box);

var _FastBlur = __webpack_require__(6);

var _FastBlur2 = _interopRequireDefault(_FastBlur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Colorful Flak Burst effect


var Radial = function (_Effect) {
	_inherits(Radial, _Effect);

	function Radial(parent, options) {
		_classCallCheck(this, Radial);

		return _possibleConstructorReturn(this, (Radial.__proto__ || Object.getPrototypeOf(Radial)).call(this, parent, options));
	}

	_createClass(Radial, [{
		key: 'init',
		value: function init() {
			// this.ctx.globalAlpha = 0.3;
			this.ctx.globalCompositeOperation = 'overlay';
			this.makeRings();
		}
	}, {
		key: 'makeRings',
		value: function makeRings() {
			var centerX = Math.random() * (this.canvas.width / 2) + this.canvas.width / 4;
			var centerY = Math.random() * (this.canvas.width / 2) + this.canvas.width / 4;
			// let initialColor = Math.floor(Math.random() * 360);

			// layer 4
			for (var i = 0; i < 40; i++) {
				var randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
				var newHeight = 200 + Math.random() * 400;
				var newParticle = new _Box2.default(this.pctx, {
					lifetime: 3000,
					xPos: centerX,
					yPos: centerY,
					width: 2,
					height: newHeight,
					offsetY: 300 + Math.random() * 200 + newHeight / 2,
					rotation: Math.random() * 360,
					angularVelocity: 0.5 * (Math.random() > 0.5 ? 1 : -1),
					drag: 0.02,
					startColor: randColor.start,
					endColor: randColor.end
					// noiseType: 'random',
					// noiseAmount: 1
				});

				this.activeParticles.push(newParticle);
			}

			// layer 3
			for (var _i = 0; _i < 15; _i++) {
				var _randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
				var _newHeight = 50 + Math.random() * 300;
				var _newParticle = new _Box2.default(this.pctx, {
					lifetime: 2500,
					xPos: centerX,
					yPos: centerY,
					width: 10,
					height: _newHeight,
					offsetY: 200 + _newHeight / 2,
					rotation: Math.random() * 360,
					angularVelocity: (1 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1),
					drag: 0.04,
					startColor: _randColor.start,
					endColor: _randColor.end
					// noiseType: 'random',
					// noiseAmount: 3
				});

				this.activeParticles.push(_newParticle);
			}

			// layer 2
			for (var _i2 = 0; _i2 < 10; _i2++) {
				var _randColor2 = this.theme[Math.floor(Math.random() * this.theme.length)];
				var _newHeight2 = 100 + Math.random() * 100;
				var _newParticle2 = new _Box2.default(this.pctx, {
					lifetime: 1500,
					xPos: centerX,
					yPos: centerY,
					width: 20,
					height: _newHeight2,
					offsetY: 100 + _newHeight2 / 2,
					rotation: Math.random() * 360,
					angularVelocity: 5 * (Math.random() > 0.5 ? 1 : -1),
					drag: 0.1,
					startColor: _randColor2.start,
					endColor: _randColor2.end
					// noiseType: 'random',
					// noiseAmount: 3
				});

				this.activeParticles.push(_newParticle2);
			}

			// layer 1
			// for (let i = 0; i < 3; i++) {
			// 	let randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
			// 	let newParticle = new Box(this.pctx, {
			// 		lifetime: 1500,
			// 		xPos: centerX,
			// 		yPos: centerY,
			// 		width: 50,
			// 		height: 100,
			// 		offsetY: 50,
			// 		rotation: (120 * i) + (Math.random() * 45),
			// 		angularVelocity: 8 * (i > 0 ? 1 : -1),
			// 		drag: 0.05,
			// 		startColor: randColor.start,
			// 		endColor: randColor.end
			// 	});

			// 	this.activeParticles.push(newParticle);
			// }
		}

		// update(timestamp) {
		// 	super.update(timestamp);
		// 	FastBlur.extremeFractalBlur(this.canvas, this.ctx, 8);
		// }

	}, {
		key: 'end',
		value: function end() {
			clearInterval(this.interval);
		}
	}]);

	return Radial;
}(_Effect3.default);

exports.default = Radial;
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle2 = __webpack_require__(1);

var _Particle3 = _interopRequireDefault(_Particle2);

var _Ease = __webpack_require__(2);

var _Ease2 = _interopRequireDefault(_Ease);

var _Noise = __webpack_require__(3);

var _Noise2 = _interopRequireDefault(_Noise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // wispy tendril particle, inspired by Mustafa: https://codepen.io/shadowman86/pen/EDBiC?page=3


var Box = function (_Particle) {
	_inherits(Box, _Particle);

	function Box(context, options) {
		_classCallCheck(this, Box);

		var _this = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, context, options));

		_this.width = options.width || 50;
		_this.height = options.height || 50;
		return _this;
	}

	_createClass(Box, [{
		key: 'move',
		value: function move(noise) {
			// update velocity
			this.velocity.x += this.force.x;
			this.velocity.x *= 1 - this.drag;
			this.velocity.y += this.force.y;
			this.velocity.y *= 1 - this.drag;

			this.rotation += this.angularVelocity;
			this.angularVelocity *= 1 - this.drag;

			// update position
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;

			this.applyNoise();

			// update color and scale
			this.currentColor = this.color.lerp(this.percentComplete);

			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			// console.log(this.tailPos.x);
			this.ctx.fillStyle = this.currentColor;
			this.ctx.translate(this.position.x, this.position.y);
			this.ctx.rotate(this.rotation * Math.PI / 180);
			this.ctx.fillRect(0 - this.width / 2 + this.offset.x, 0 - this.height / 2 + this.offset.y, this.width, this.height);
			this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}, {
		key: 'applyNoise',
		value: function applyNoise() {
			switch (this.noiseType) {
				case 'none':
					// do nothing
					break;
				case 'random':
					var newNoise = _Noise2.default.random(this.noiseAmount);
					this.rotation += newNoise.x;
					break;
			}
		}
	}]);

	return Box;
}(_Particle3.default);

exports.default = Box;
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Effect2 = __webpack_require__(0);

var _Effect3 = _interopRequireDefault(_Effect2);

var _Particle = __webpack_require__(1);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Colorful Flak Burst effect


var Mandela = function (_Effect) {
	_inherits(Mandela, _Effect);

	function Mandela(parent, options) {
		_classCallCheck(this, Mandela);

		var _this = _possibleConstructorReturn(this, (Mandela.__proto__ || Object.getPrototypeOf(Mandela)).call(this, parent, options));

		_this.d2r = Math.PI / 180;
		_this.center = _this.canvas.width / 2;
		_this.diameter = Math.floor(Math.random() * 200);
		_this.maxVelocity = 2 + Math.random() * 14;
		return _this;
	}

	_createClass(Mandela, [{
		key: 'init',
		value: function init() {
			// let symmetry = 16;
			var symmetry = 4 + 2 * Math.floor(Math.random() * 9);

			for (var i = 0; i < 5; i++) {
				this.makeMandelbrot(300 / symmetry);
			}
		}
	}, {
		key: 'makeMandelbrot',
		value: function makeMandelbrot(symmetry) {
			var steps = 360 / symmetry * this.d2r;
			var randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
			var sync = Math.random() > 0.5;

			var xMod = Math.random() * this.diameter;
			var yMod = Math.random() * this.diameter;
			var xVelocity = Math.random() * this.maxVelocity * (Math.random() > 0.5 ? 1 : -1);
			var yVelocity = Math.random() * this.maxVelocity * (Math.random() > 0.5 ? 1 : -1);
			var xForce = Math.random() * 0.1 * Math.sign(-xVelocity);
			var yForce = Math.random() * 0.1 * Math.sign(-yVelocity);
			var angularVelocity = Math.random() * 20 - 10;

			// if (Math.abs(xVelocity) > Math.abs(yVelocity)) {
			// 	xForce = -xVelocity * 0.01;
			// } else {
			// 	yForce = -yVelocity * 0.01;
			// }

			for (var i = 0; i < symmetry; i++) {
				var curStep = steps / 2 + i * steps;
				var sin = Math.sin(curStep);
				if (sin > 3.14) {
					sin *= -1;
				}

				var cos = Math.cos(curStep);
				if (cos > 1.57 && cos < 4.71) {
					// negative
					cos *= -1;
				}

				var newParticle = new _Particle2.default(this.pctx, {
					lifetime: 5000,
					size: 2 + Math.random() * 10,
					xPos: sin * xMod + this.center,
					yPos: cos * yMod + this.center,
					xVelocity: sin * xVelocity,
					yVelocity: cos * yVelocity,
					xForce: sin * xForce,
					yForce: cos * yForce,
					offsetY: Math.random() * 50,
					angularVelocity: sync ? sin * angularVelocity : Math.random() * 20 - 10,
					startColor: randColor.start,
					endColor: randColor.end
				});

				this.activeParticles.push(newParticle);
			}
		}
	}]);

	return Mandela;
}(_Effect3.default);

exports.default = Mandela;
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Effect2 = __webpack_require__(0);

var _Effect3 = _interopRequireDefault(_Effect2);

var _Particle = __webpack_require__(1);

var _Particle2 = _interopRequireDefault(_Particle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Clear Canvas to specified color


var ClearToColor = function (_Effect) {
	_inherits(ClearToColor, _Effect);

	function ClearToColor(parent, options) {
		_classCallCheck(this, ClearToColor);

		var _this = _possibleConstructorReturn(this, (ClearToColor.__proto__ || Object.getPrototypeOf(ClearToColor)).call(this, parent, options));

		console.log(options.color);
		// wipe to white by default
		_this.wipeColor = options.color || 'hsla(0, 0%, 0%, 1)';
		return _this;
	}

	_createClass(ClearToColor, [{
		key: 'init',
		value: function init() {
			this.burst();
		}
	}, {
		key: 'burst',
		value: function burst() {

			for (var i = 0; i < 5; i++) {
				var newParticle = new _Particle2.default(this.pctx, {
					lifetime: 500,
					size: 1000,
					xPos: Math.random() * this.canvas.width,
					yPos: Math.random() * this.canvas.width,
					startScale: 0.1,
					endScale: 1,
					startColor: this.wipeColor,
					endColor: this.wipeColor,
					noiseType: 'random',
					noiseAmount: 10
				});

				this.activeParticles.push(newParticle);
			}
		}
	}]);

	return ClearToColor;
}(_Effect3.default);

exports.default = ClearToColor;
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utilities = function () {
	function Utilities() {
		_classCallCheck(this, Utilities);
	}

	_createClass(Utilities, null, [{
		key: "shuffle",
		value: function shuffle(array) {
			var i = array.length,
			    j = void 0,
			    temp = void 0;

			if (i === 0) {
				return;
			}
			while (--i) {
				j = Math.floor(Math.random() * (i + 1));
				temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
	}, {
		key: "randFromArray",
		value: function randFromArray(array) {
			return array[Math.floor(Math.random() * array.length)];
		}
	}]);

	return Utilities;
}();

exports.default = Utilities;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=Powderpuff.js.map