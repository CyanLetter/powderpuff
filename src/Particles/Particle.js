// Base class for smoke particles
import Ease from '../Ease.js';
import Noise from '../Noise.js';
import {Color} from '../Color.js';

export default class Particle {
	constructor(context, options) {
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

		this.color = new Color(options.startColor || 'hsla(0, 100%, 50%, 0.01)', options.endColor || 'hsla(0, 100%, 50%, 0.01)');
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

	move(noise) {
		
		// update velocity
		this.velocity.x += this.force.x;
		this.velocity.x *= 1 - (this.drag);
		this.velocity.y += this.force.y;
		this.velocity.y *= 1 - (this.drag);

		this.rotation += this.angularVelocity;
		this.angularVelocity *= 1 - (this.drag);

		// update position
		this.position.x += this.velocity.x + noise.x;
		this.position.y += this.velocity.y + noise.y;

		this.applyNoise();

		// update color and scale
		this.currentColor = this.color.lerp(this.percentComplete);
		this.currentScale = Ease.lerp(this.scale.start, this.scale.end, this.percentComplete);

		this.draw();
	}

	draw() {
		this.ctx.fillStyle = this.currentColor;
		if (this.rotation !== 0) {
			this.ctx.translate(this.position.x, this.position.y);
			this.ctx.rotate(this.rotation * Math.PI / 180);
			this.ctx.beginPath();
			this.ctx.arc(0 - (this.size / 2) + this.offset.x, 0 - (this.size / 2) + this.offset.y, this.size * this.currentScale, 0, 6.28, false);
			this.ctx.fill();
			this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		} else {
			this.ctx.beginPath();
			this.ctx.arc(this.position.x, this.position.y, this.size * this.currentScale, 0, 6.28, false);
			this.ctx.fill();
		}
		

		
	}

	applyNoise() {
		switch (this.noiseType) {
		case 'none':
			// do nothing
			break;
		case 'random':
			let newNoise = Noise.random(this.noiseAmount);
			
			this.position.x += newNoise.x;
			this.position.y += newNoise.y;
			break;
		}
	}

	update(dt, noise) {
		this.currentTime += dt;
		this.percentComplete = this.currentTime / this.lifetime;
		if (this.percentComplete >= 1) {
			this.percentComplete = 1;
			this.isDead = true;
		}
		noise = noise || {x: 0, y: 0};

		this.move(noise);
	}
}
