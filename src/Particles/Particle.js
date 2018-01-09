// Base class for smoke particles
import Ease from '../Ease.js';
import Noise from '../Noise.js';
import Color from '../Color.js';

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

		// TODO: Implement particle rotation
		this.rotation = {
			start: options.startRotation || 0,
			end: options.endRotation || 6.28 // 2 radians
		};

		this.currentScale = options.startScale || 1;
		this.scale = {
			start: options.startScale || 1,
			end: options.endScale || 0
		};

		this.noiseType = options.noiseType || 'none';
		this.noiseAmount = options.noiseAmount || 0;

	}

	move (timeScale, noise) {
		
		// update velocity
		this.velocity.x += this.force.x * timeScale;
		this.velocity.x *= 1 - (this.drag * timeScale);
		this.velocity.y += this.force.y * timeScale;
		this.velocity.y *= 1 - (this.drag * timeScale);

		// update position
		this.position.x += this.velocity.x + noise.x;
		this.position.y += this.velocity.y + noise.y;

		this.applyNoise();

		// update color and scale
		this.currentColor = this.color.lerp(this.percentComplete);
		this.currentScale = Ease.lerp(this.scale.start, this.scale.end, this.percentComplete);

		this.draw();
	}

	draw () {
		this.ctx.fillStyle = this.currentColor;
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.size * this.currentScale, 0, 6.28, false);
		this.ctx.fill();
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

	update (dt, timeScale, noise) {
		this.currentTime += dt;
		this.percentComplete = this.currentTime / this.lifetime;
		if (this.percentComplete >= 1) {
			this.percentComplete = 1;
			this.isDead = true;
		}
		noise = noise || {x: 0, y: 0};

		this.move(timeScale, noise);
	}
}