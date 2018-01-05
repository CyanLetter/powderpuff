/**
 * Main controller class for Powderpuff
 */

 // Also possible - transition from transparent to solid to transparent

 // container, either create own or add to existing
 // min and max dimensions for render canvas
 // setup and window resize function
 // puff trigger that generates new render and smoke canvas, takes colors and puff mode as args
 // hsl color changes
 // modes: gradient wipe, zig zag, spiral, starbursts, random splotches
 // possible modes: bezier path tracer, point array spot bursts - for rudimentary images

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

	// load smoke image
	this.loadSmokeImage();
	this.useSmokeImage = false;

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
	// add one for the smoke image
	if (this.loadedImages === this.images.length + 1) {
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

		if (this.useSmokeImage) {
			// pick rotation, to keep tiling from being obvious
			var rot = Math.random() * 6.28; // random radian value
			// translate and rotate to correct point
			this.sctx.translate(pt.x, pt.y);
			this.sctx.rotate(rot);
			this.sctx.translate(-32, -32); // hard code this because smoke os a 64px png
			// draw the smoke
			this.sctx.drawImage(this.smokeImage, 0, 0)
			// undo the transform
			this.sctx.translate(32, 32);
			this.sctx.rotate(-rot);
			this.sctx.translate(-pt.x, -pt.y);
		} else {
			// just use a circle instead
			this.sctx.beginPath();
			this.sctx.arc(pt.x, pt.y, (this.canvas.height / this.particleCount), 0, Math.PI * 2, false);
			this.sctx.fill();
		}
		
		
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

Powderpuff.prototype.loadSmokeImage = function() {
	this.smokeImage = new Image();
	this.smokeImage.onload = this.onImageLoad;
	this.smokeImage.src = "data:image/png;base64,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";
};

Powderpuff.prototype.destroy = function() {
	window.removeEventListener("resize", this.requestResize);
};

