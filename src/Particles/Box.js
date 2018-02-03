// wispy tendril particle, inspired by Mustafa: https://codepen.io/shadowman86/pen/EDBiC?page=3
import Particle from './Particle.js';
import Ease from '../Ease.js';
import Noise from '../Noise.js';

export default class Box extends Particle {
	constructor(context, options) {
		super(context, options);

		this.width = options.width || 50;
		this.height = options.height || 50;
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
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.applyNoise();

		// update color and scale
		this.currentColor = this.color.lerp(this.percentComplete);

		this.draw();
	}

	draw() {
		// console.log(this.tailPos.x);
		this.ctx.fillStyle = this.currentColor;
		this.ctx.translate(this.position.x, this.position.y);
		this.ctx.rotate(this.rotation * Math.PI / 180);
		this.ctx.fillRect(0 - (this.width / 2) + this.offset.x, 0 - (this.height / 2) + this.offset.y, this.width, this.height);
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	}

	applyNoise() {
		switch (this.noiseType) {
		case 'none':
			// do nothing
			break;
		case 'random':
			let newNoise = Noise.random(this.noiseAmount);
			this.rotation += newNoise.x;
			break;
		}
	}
}
