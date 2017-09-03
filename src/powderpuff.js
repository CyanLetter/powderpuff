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
	// this.lastTime = Date.now();
	// this.currentTime = Date.now();
	this.delta = 0;
	this.revealDuration = 1000;

	this.particleCount = 24;
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
	this.rctx = this.renderCanvas.getContext("2d");

	this.smokeCanvas = document.createElement("canvas");
	this.smokeCanvas.width = this.canvas.width;
	this.smokeCanvas.height = this.canvas.height;
	this.sctx = this.smokeCanvas.getContext("2d");

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

	for (var i = 0; i < this.particleCount; i++) {
		this.smokePoints.push({
			start: {
				x: 0,
				y: (this.canvas.height / this.particleCount) * i
			},
			end: {
				x: this.canvas.width,
				y: (this.canvas.height / this.particleCount) * i
			}
		});
	}

	this.canvasScale = [

	];

	// make canvas for smoke particles. Draw to and scale that
	// Draw that to the offscreen canvas
	// then draw the images to main canvas and mask with smoke canvas
};

Powderpuff.prototype.resize = function() {
	this.renderCanvas.width = this.canvas.width = this.canvas.offsetWidth;
	this.renderCanvas.height = this.canvas.height = this.canvas.offsetHeight;
	this.smokeCanvas.width = this.canvas.width = this.canvas.offsetWidth;
	this.smokeCanvas.height = this.canvas.height = this.canvas.offsetHeight;
};

Powderpuff.prototype.lerp = function(value1, value2, amount) {
	return (1 - amount) * value1 + amount * value2;
};

Powderpuff.prototype.update = function(timestamp) {
	// run animations, update rendertextures
	this.lastTime = this.lastTime || timestamp;

	if (this.revealing) {
		
		console.log("revealing...");
		// deltatime
		this.revealTime += timestamp - this.lastTime;
		var amt = this.revealTime / this.revealDuration;
		// console.log(timestamp - this.lastTime);
		if (amt <= 1) {
			this.sctx.fillStyle = "rgba(255, 255, 255, 0.05)";
			for (var i = 0; i < this.smokePoints.length; i++) {
				var pt = this.smokePoints[i];
				pt.x = this.lerp(pt.start.x, pt.end.x, amt);
				pt.y = this.lerp(pt.start.y, pt.end.y, amt);
				// add noise
				pt.x += Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1);
				pt.y += Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1);
				this.sctx.beginPath();
				this.sctx.arc(pt.x, pt.y, (this.canvas.height / this.particleCount) / 1.5, 0, Math.PI * 2, false);
				this.sctx.fill();
			}
		}
		
		this.rctx.drawImage(
			this.smokeCanvas, 
			amt * -100, 
			amt * -100, 
			this.canvas.width + (amt * 200), 
			this.canvas.height + (amt * 200));

		this.ctx.globalCompositeOperation = "source-over";
		for (var i = 0; i < this.images.length; i++) {
			this.ctx.drawImage(this.images[i], 0, 0);
		}

		this.ctx.globalCompositeOperation = "destination-in";
		this.ctx.drawImage(this.renderCanvas, 0, 0);
		
		if (amt >= 2) {
			this.revealing = false;
			console.log("done!");
		}
	}

	this.lastTime = timestamp;

	requestAnimationFrame(this.update);
};
