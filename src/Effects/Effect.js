// Base class for smoke effects
import Ease from '../Ease.js';
import Particle from '../Particles/Particle.js';

export default class Effect {
	constructor(parent, options) {
		options = options || {};

		this.parent = parent;
		this.framerate = options.framerate || 60;
		this.tick = 1000 / this.framerate;

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

		// render canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.canvas.height = this.parent.canvasSize;
		this.ctx = this.canvas.getContext("2d");
		// particle canvas
		this.pCanvas = document.createElement('canvas');
		this.pCanvas.width = this.pCanvas.height = this.parent.canvasSize;
		this.pctx = this.pCanvas.getContext("2d");

		this.init();
	}

	init () {
		for (let i =0; i < 50; i++) {
			let newParticle = new Particle(this.pctx, {
				lifetime: 1000,
				size: 50,
				xPos: (this.parent.canvasSize / 2) - 40 + (Math.random() * 80),
				yPos: (this.parent.canvasSize / 2) - 40 + (Math.random() * 80),
				xVelocity: -20 + (Math.random() * 40),
				yVelocity: -20 + (Math.random() * 40),
				drag: 0.02,
				startColor: 'hsla(' + (-20 + i) + ', 80%, 50%, 0.01)',
				endColor: 'hsla(' + (30 + i) + ', 80%, 50%, 0.01)',
				noiseType: 'random',
				noiseAmount: 10 
			});
			this.activeParticles.push(newParticle);
		}
	}

	update (timestamp) {
		if (!this.startTime) {
			this.startTime = timestamp;
			this.lastTime = timestamp;
		}
		
		let dt = timestamp - this.lastTime;
		let timeScale = dt / this.tick;

		this.lastTime = timestamp;
		this.currentTime += dt;
		this.percentComplete = this.currentTime / this.lifetime;
		if (this.percentComplete >= 1) {
			this.percentComplete = 1;
			this.isDead = true;
		}

		// console.log(this.activeParticles.length);
		for (let i = this.activeParticles.length - 1; i >= 0; i--) {
			if (this.activeParticles[i].isDead) {
				this.activeParticles[i] = null;
				this.activeParticles.splice(i, 1);
			} else {
				this.activeParticles[i].update(dt, timeScale);
			}
		}

		// update canvas positions
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.currentScale = Ease.lerp(this.scale.start, this.scale.end, this.percentComplete, Ease.easeOutQuad);
		let canvasDims = this.scaleDrawable(this.canvas.width, this.canvas.height, this.currentScale);

		this.ctx.drawImage(this.pCanvas, canvasDims.x + this.position.x, canvasDims.y + this.position.y, canvasDims.width, canvasDims.height);
	}

	scaleDrawable (w, h, scale) {
		// return scale values that can be used in drawImage operations
		return {
			x: ((scale * w) - w) * -0.5,
			y: ((scale * h) - h) * -0.5,
			width: scale * w,
			height: scale * h
		}
	}
}