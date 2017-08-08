PixiPuff = function(options) {
	options = options || {};

	this.init = this.init.bind(this);
	this.update = this.update.bind(this);
	this.reveal = this.reveal.bind(this);

	// mode: burst, spiral, godray
	this.mode = typeof options.mode !== "undefined" ? options.mode : "burst";

	this.init();
};
PixiPuff.prototype = Object.create(Object.prototype);
PixiPuff.prototype.constructor = PixiPuff;

PixiPuff.prototype.init = function() {
	// get canvases, start pixi
	console.log("initialized");

	this.update();
};

PixiPuff.prototype.update = function() {
	// run animations, update rendertextures
	console.log("updating");

	requestAnimationFrame(this.update);
};

PixiPuff.prototype.reveal = function() {
	// start a reveal animation
	console.log("revealing");
};


