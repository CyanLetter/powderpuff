// Base class for smoke effects
import Particle from '../Particles/Particle.js';

export default class Effect {
	constructor(parent, options) {
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

	init () {
		for (let i =0; i < 50; i++) {
			let newParticle = new Particle(this.pctx, {
				xPos: this.canvas.width / 2,
				yPos: this.canvas.width / 2,
				xVelocity: -20 + (Math.random() * 40),
				yVelocity: -20 + (Math.random() * 40),
				yForce: 0.4,
				drag: 0.02
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

		for (let i = this.activeParticles.length - 1; i >= 0; i--) {
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
}