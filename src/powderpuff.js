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
	this.particleDuration = 1000; // time it takes for particles to finish moving
	this.revealDuration = 2000; // total time of the reveal effect. This is greater to allow for a trailing reveal efffect

	this.particleCount = 24;
	this.smokePoints = [];
	this.smokeScale = 0.2; // amount to increase the smoke canvas size

	// get and load images
	this.images = [];
	this.loadedImages = 0;

	console.log(typeof options.images);

	if (typeof options === "string") {
		this.images.push(this.createImageObject(options));
		
		options = {};
	} else if (typeof options.images === "string") {
		this.images.push(this.createImageObject(options.images));		
	} else if (typeof options.images === "object" && Array.isArray(options.images) === true) {
		for (var i = 0; i < options.images.length; i++) {
			this.images.push(this.createImageObject(options.images[i]));
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
		this.images[i].img.onload = this.onImageLoad;
	}
};

Powderpuff.prototype.createImageObject = function(src) {
	var newObj = {
		src: src,
		img: new Image,
		scale: 0.2,
		x: 0,
		y: 0,
		anchor: {
			x: 0.5, 
			y: 0.5
		}
	};
	newObj.img.src = newObj.src;
	return newObj;
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

Powderpuff.prototype.drawParticles = function(amt) {
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
};

Powderpuff.prototype.drawImages = function(amt) {
	this.ctx.globalCompositeOperation = "source-over";
	for (var i = 0; i < this.images.length; i++) {
		var image = this.images[i];
		var imgScale = this.scaleFromAnchor(image.img.width, image.img.height, amt * image.scale, image.anchor.x, image.anchor.y);
		this.ctx.drawImage(image.img, image.x + imgScale.x, image.y + imgScale.y, imgScale.width, imgScale.height);
	}
};

Powderpuff.prototype.scaleFromAnchor = function(w, h, scale, aX, aY) {
	// return scale values that can be used in drawImage operations
	aX = typeof aX === "undefined" ? 0.5 : aX; // default to center center
	aY = typeof aY === "undefined" ? 0.5 : aY;
	return {
		x: (scale * aX) * w * -1,
		y: (scale * aY) * h * -1,
		width: w + (scale * w),
		height: h + (scale * h)
	}
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
		// deltatime
		this.revealTime += timestamp - this.lastTime;
		var particleTime = this.revealTime / this.particleDuration;
		var totalTime = this.revealTime / this.revealDuration;

		if (particleTime <= 1) {
			this.drawParticles(particleTime);
		}
		
		// draw smoke to render canvas
		var smokeCanvasDims = this.scaleFromAnchor(this.canvas.width, this.canvas.height, totalTime * this.smokeScale, 1 - particleTime);
		
		this.rctx.drawImage(
			this.smokeCanvas, 
			smokeCanvasDims.x,
			smokeCanvasDims.y,
			smokeCanvasDims.width,
			smokeCanvasDims.height);

		// draw base images
		this.drawImages(totalTime);

		// mask images with smoke
		this.ctx.globalCompositeOperation = "destination-in";
		this.ctx.drawImage(this.renderCanvas, 0, 0);
		
		if (totalTime >= 1) {
			this.revealing = false;
			console.log("done!");
		}
	}

	this.lastTime = timestamp;

	requestAnimationFrame(this.update);
};
