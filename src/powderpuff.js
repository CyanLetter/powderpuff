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
	this.requestResize = this.requestResize.bind(this);
	this.resize = this.resize.bind(this);
	this.update = this.update.bind(this);

	this.init(options);
};
Powderpuff.prototype = Object.create(Object.prototype);
Powderpuff.prototype.constructor = Powderpuff;

Powderpuff.prototype.init = function(options) {
	// get canvas, load images
	console.log("powdering...");

	this.needsResize = true;

	this.delta = 0;
	this.particleDuration = 1000; // time it takes for particles to finish moving
	this.revealDuration = 2000; // total time of the reveal effect. This is greater to allow for a trailing reveal efffect
	this.particleTime = 0;
	this.totalTime = 0;
	this.revealProgress = 0;

	this.particleCount = 24;
	this.smokePoints = [];
	this.smokeScale = 0.5; // amount to increase the smoke canvas size

	// get and load images
	this.images = [];
	this.loadedImages = 0;

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
		scaleMode: "native", // cover, contain, native
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
		window.addEventListener("resize", this.requestResize);
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
	this.sctx.fillStyle = "rgba(255, 255, 255, 0.01)";
	for (var i = 0; i < this.smokePoints.length; i++) {
		var pt = this.smokePoints[i];
		pt.x = this.lerp(pt.start.x, pt.end.x, amt);
		pt.y = this.lerp(pt.start.y, pt.end.y, amt);
		// add noise
		pt.x += Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1);
		pt.y += Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1);
		this.sctx.beginPath();
		this.sctx.arc(pt.x, pt.y, (this.canvas.height / this.particleCount), 0, Math.PI * 2, false);
		this.sctx.fill();
	}
};

Powderpuff.prototype.drawSmoke = function() {
	var smokeCanvasDims = this.scaleDrawable(this.canvas.width, this.canvas.height, this.totalTime * this.smokeScale, this.easeOutQuad(1 - this.particleTime));
		
	this.rctx.drawImage(
		this.smokeCanvas, 
		smokeCanvasDims.x,
		smokeCanvasDims.y,
		smokeCanvasDims.width,
		smokeCanvasDims.height);
};

Powderpuff.prototype.drawImages = function() {
	this.ctx.globalCompositeOperation = "source-over";
	for (var i = 0; i < this.images.length; i++) {
		var image = this.images[i];
		var initialScale = this.getInitialScale(image.img, image.scaleMode);
		var initialPos = this.getAnchorPos(image.anchor, image.img.width * initialScale, 
			image.img.height * initialScale);

		var imgScale = this.scaleDrawable(
			image.img.width * initialScale, 
			image.img.height * initialScale, 
			this.revealProgress * image.scale);

		this.ctx.drawImage(
			image.img, 
			initialPos.x + imgScale.x, 
			initialPos.y + imgScale.y, 
			imgScale.width, 
			imgScale.height);
	}

	// mask images with smoke
	this.ctx.globalCompositeOperation = "destination-in";
	this.ctx.drawImage(this.renderCanvas, 0, 0);
};

Powderpuff.prototype.getAnchorPos = function(anchor, w, h) {
	// get item position on canvas based on anchor point
	return {
		y: (anchor.y * this.canvas.height) - (anchor.y * h),
		x: (anchor.x * this.canvas.width) - (anchor.x * w)
	};
};

Powderpuff.prototype.getInitialScale = function(elem, mode) {
	var scaleVal = 1;

	if (mode === "native") {
		// do nothing, scale normally
	} else if (mode === "cover") {
		scaleVal = Math.max(this.canvas.width / elem.width, this.canvas.height / elem.height);
	} else if (mode === "contain") {
		scaleVal = Math.min(this.canvas.width / elem.width, this.canvas.height / elem.height);
	}

	return scaleVal;
};

Powderpuff.prototype.scaleDrawable = function(w, h, scale) {
	// return scale values that can be used in drawImage operations
	return {
		x: (scale * 0.5) * w * -1,
		y: (scale * 0.5) * h * -1,
		width: w + (scale * w),
		height: h + (scale * h)
	}
};

Powderpuff.prototype.requestResize = function() {
	this.needsResize = true;
};

Powderpuff.prototype.resize = function() {
	this.renderCanvas.width = this.smokeCanvas.width = this.canvas.width = this.canvas.offsetWidth;
	this.renderCanvas.height = this.smokeCanvas.height = this.canvas.height = this.canvas.offsetHeight;
	if (this.revealProgress > 0) {
		// reveal everything, don't try to deal with resizing mid-animation
		this.sctx.fillStyle = "rgba(255, 255, 255, 1)";
		this.sctx.beginPath();
		this.sctx.rect(0, 0, this.smokeCanvas.width, this.smokeCanvas.height);
		this.sctx.fill();
	}
	
	this.drawSmoke();
	this.drawImages();
	this.needsResize = false;
};

Powderpuff.prototype.lerp = function(value1, value2, amount) {
	return (1 - amount) * value1 + amount * value2;
};

Powderpuff.prototype.easeOutQuad = function(t) {
	return t * (2 - t);
};

Powderpuff.prototype.update = function(timestamp) {
	// run animations, update rendertextures
	this.lastTime = this.lastTime || timestamp;

	if (this.needsResize === true) {
		this.resize();
	}

	if (this.revealing) {
		// deltatime
		this.revealTime += timestamp - this.lastTime;
		this.particleTime = this.revealTime / this.particleDuration;
		this.totalTime = this.revealTime / this.revealDuration;
		this.revealProgress = this.easeOutQuad(this.totalTime);

		if (this.particleTime <= 1) {
			this.drawParticles(this.particleTime);
		}
		
		// draw smoke to render canvas
		this.drawSmoke();

		// draw base images
		this.drawImages();
		
		if (this.totalTime >= 1) {
			this.revealing = false;
			console.log("done!");
		}
	}

	this.lastTime = timestamp;

	requestAnimationFrame(this.update);
};

Powderpuff.prototype.destroy = function() {
	window.removeEventListener("resize", this.requestResize);
};