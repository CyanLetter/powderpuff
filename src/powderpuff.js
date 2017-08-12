Powderpuff = function(options) {
	options = options || {};

	this.init = this.init.bind(this);
	this.add = this.add.bind(this);
	this.update = this.update.bind(this);
	this.resize = this.resize.bind(this);
	this.reveal = this.reveal.bind(this);

	// mode: burst, spiral, godray
	this.mode = typeof options.mode !== "undefined" ? options.mode : "burst";
	this.canvases = [];

	this.init();
};
Powderpuff.prototype = Object.create(Object.prototype);
Powderpuff.prototype.constructor = Powderpuff;

Powderpuff.prototype.init = function() {
	// get canvases, start pixi
	console.log("initialized");

	this.update();
};

Powderpuff.prototype.add = function(options) {
	// add a canvas and image options
	// example object
	/*
	{
		id: canvas ID,
		canvas: canvas element, // generate this automatically
		images: [
			// array or single image
			{
				src: 'path/to/image.png',

			}
		]
	}
	*/
	options = options || {};
};

Powderpuff.prototype.resize = function() {

};

Powderpuff.prototype.reveal = function() {
	// start a reveal animation
	console.log("revealing");
};

Powderpuff.prototype.update = function() {
	// run animations, update rendertextures
	console.log("updating");

	requestAnimationFrame(this.update);
};