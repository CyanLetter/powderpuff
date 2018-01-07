// Base class for smoke particles
import Ease from '../Ease.js';

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
			x: options.xVelocity || 10,
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

		this.currentColor = options.startColor || 'hsla(0, 100%, 50%, 0.01)';
		this.color = {
			start: options.startColor || '#ff0000',
			end: options.endColor || '#ff0000'
		};

		// not using this right now
		this.rotation = {
			start: options.startRotation || 0,
			end: options.endRotation || 6.28 // 2 radians
		};

		this.currentScale = options.startScale || 1;
		this.scale = {
			start: options.startScale || 1,
			end: options.endScale || 0
		};

		this.draw();
	}

	draw () {
		this.ctx.fillStyle = this.currentColor;
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.size * this.currentScale, 0, Math.PI * 2, false);
		this.ctx.fill();
	}

	update (dt, timeScale, noise) {
		this.currentTime += dt;
		this.percentComplete = this.currentTime / this.lifetime;
		if (this.percentComplete >= 1) {
			this.percentComplete = 1;
			this.isDead = true;
		}

		// update velocity
		this.velocity.x += this.force.x * timeScale;
		this.velocity.x *= 1 - (this.drag * timeScale);
		this.velocity.y += this.force.y * timeScale;
		this.velocity.y *= 1 - (this.drag * timeScale);

		// update position
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		// update color and scale
		// this.currentColor = Ease.lerp(this.color.start, this.color.end, this.percentComplete);
		this.currentScale = Ease.lerp(this.scale.start, this.scale.end, this.percentComplete);

		this.draw();
	}
}