/**
 * Main controller class for Powderpuff
 */

Powderpuff = function(options) {
	if (typeof options !== "object" && typeof options !== "string") {
		console.error("Options object or image url required!");
	}

	// bind functions
	this.init = this.init.bind(this);
	this.onImageLoad = this.onImageLoad.bind(this);
	this.reveal = this.reveal.bind(this);
	this.resize = this.resize.bind(this);
	this.update = this.update.bind(this);

	this.init(options);
};
Powderpuff.prototype = Object.create(Object.prototype);
Powderpuff.prototype.constructor = Powderpuff;

Powderpuff.prototype.init = function(options) {
	// get canvas, load images
	console.log("powdering...");

	// example object
	/*
	{
		canvasId: canvas ID,
		canvas: canvas element, // generate this automatically
		images: [
			// array or single image
			// todo: add anchoring options for the images
		]
	}
	*/
	this.lastTime = Date.now();
	this.currentTime = Date.now();
	this.delta = 0;
	this.revealDuration = 3000;

	this.smokePoints = [];

	// get and load images
	this.images = [];
	this.loadedImages = 0;

	if (typeof options === "string") {
		this.images.push(new Image);
		this.images[0].src = options;
		options = {};
	} else if (typeof options.images === "string") {
		this.images.push(new Image);
		this.images[0].src = options;
		
	} else if (typeof options.images === "array") {
		for (var i = 0; i < options.images.length; i++) {
			this.images.push(new Image);
			this.images[i].src = options.images[i];
		}
	} else {
		console.error("Invalid format - images must be passed as a url or array of urls");
		return;
	}
	
	// set canvas options
	this.canvasId = typeof options.canvasId !== "undefined" ? options.canvasId : "powderpuff";
	this.canvas = document.getElementById(this.canvasId);
	this.ctx = this.canvas.getContext("2d");

	this.renderCanvas = document.createElement("canvas");
	this.renderCanvas.width = this.canvas.width;
	this.renderCanvas.height = this.canvas.height;

	if (this.canvas === null) {
		console.error("Could not find canvas with id of " + this.canvasId);
		return;
	}
	
	// mode: burst, spiral, godray
	this.mode = typeof options.mode !== "undefined" ? options.mode : "burst";

	// start loading images
	for (var i = 0; i < this.images.length; i++) {
		// set load callbacks
		// setting here so we know the rest of the setup went successfully
		this.images[i].onload = this.onImageLoad;
	}
};

Powderpuff.prototype.onImageLoad = function() {
	this.loadedImages++;
	if (this.loadedImages === this.images.length) {
		// start
		window.resize = this.resize;
		this.resize();
		this.update();
	}
};

Powderpuff.prototype.reveal = function() {
	// start a reveal animation
	this.revealing = true;
	this.revealTime = 0;
	console.log("revealing");

	for (var i = 0; i < 30; i++) {
		this.smokePoints.push({
			start: {
				x: 0,
				y: (this.canvas.height / 30) * i
			},
			end: {
				x: this.canvas.width,
				y: (this.canvas.height / 30) * i
			}
		});
	}

	for (var i = 0; i < this.images.length; i++) {
		this.ctx.drawImage(this.images[i], 0, 0);
	}

	// make canvas for smoke particles. Draw to and scale that
	// Draw that to the offscreen canvas
	// then draw the images to main canvas and mask with smoke canvas
};

Powderpuff.prototype.resize = function() {
	this.renderCanvas.width = this.canvas.width = this.canvas.offsetWidth;
	this.renderCanvas.height = this.canvas.height = this.canvas.offsetHeight;
};

Powderpuff.prototype.lerp = function(value1, value2, amount) {
	return (1 - amount) * value1 + amount * value2;
};

Powderpuff.prototype.update = function() {
	// run animations, update rendertextures
	this.currentTime = Date.now();
	if (this.revealing) {
		// deltatime
		this.revealTime += this.currentTime - this.lastTime;
		for (var i = 0; i < this.smokePoints.length) {

		}
	}

	requestAnimationFrame(this.update);
};
