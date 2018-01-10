// wispy tendril particle, inspired by Mustafa: https://codepen.io/shadowman86/pen/EDBiC?page=3
import Particle from './Particle.js';
import Ease from '../Ease.js';
import Noise from '../Noise.js';

export default class Wisp extends Particle {
	constructor(context, options) {
		super(context, options);

		// length of the line
		this.length = options.length || 30;

		// line weight
		this.thickness = options.thickness || 1;

		this.frequency = {
			head: options.headFreq || 0.1,
			tail: options.tailFreq || 0.1
		};

		this.amplitude = {
			head: options.headAmp || 1,
			tail: options.tailAmp || 1
		};

		this.currentWavePos = {
			head: 0,
			tail: 0
		};

		this.tailPos = {
			x: this.position.x + (Math.sin(this.rotation.start) * this.length),
			y: this.position.y + (Math.cos(this.rotation.start) * this.length)
		};
	}

	move(timeScale, noise) {
		// update velocity
		this.velocity.x += this.force.x * timeScale;
		this.velocity.x *= 1 - (this.drag * timeScale);
		this.velocity.y += this.force.y * timeScale;
		this.velocity.y *= 1 - (this.drag * timeScale);

		// update position
		this.position.x += this.velocity.x + noise.x;
		this.position.y += this.velocity.y + noise.y;
		this.tailPos.x += this.velocity.x + noise.x;
		this.tailPos.y += this.velocity.y + noise.y;

		this.applyNoise();

		// update color and scale
		this.currentColor = this.color.lerp(this.percentComplete);
		this.currentScale = Ease.lerp(this.scale.start, this.scale.end, this.percentComplete);

		this.draw();
	}

	draw() {
		// console.log(this.tailPos.x);
		this.ctx.strokeStyle = this.currentColor;
		this.ctx.lineWidth = this.thickness;
		this.ctx.lineCap = 'round';
		this.ctx.beginPath();
		this.ctx.moveTo(this.tailPos.x, this.tailPos.y);
		this.ctx.lineTo(this.position.x, this.position.y);
		this.ctx.stroke();
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

			let newNoise2 = Noise.random(this.noiseAmount);

			this.tailPos.x += newNoise2.x;
			this.tailPos.y += newNoise2.y;
			break;
		case 'wave':
			this.currentWavePos.head += this.frequency.head;
			this.currentWavePos.tail += this.frequency.tail;

			this.position.x += Math.sin(this.currentWavePos.head) * this.amplitude.head;
			this.position.y += Math.cos(this.currentWavePos.head) * this.amplitude.head;

			this.tailPos.x += Math.cos(this.currentWavePos.tail) * this.amplitude.tail;
			this.tailPos.y += Math.sin(this.currentWavePos.tail) * this.amplitude.tail;
			break;
		}
	}
}
