// Colorful Flak Burst effect
import Effect from './Effect.js';
import Particle from '../Particles/Particle.js';

export default class PrismaFlak extends Effect {
	constructor(parent, options) {
		super(parent, options);
	}

	init() {
		this.interval = setInterval(() => this.burst(), 100);

		setTimeout(() => this.end(), 3000);
	}

	burst() {
		let centerX = Math.random() * this.canvas.width;
		let centerY = Math.random() * this.canvas.width;
		let initialColor = Math.floor(Math.random() * 360);

		for (let i = 0; i < 50; i++) {
			let newParticle = new Particle(this.pctx, {
				lifetime: 500,
				size: 50,
				xPos: centerX - 40 + (Math.random() * 80),
				yPos: centerY - 40 + (Math.random() * 80),
				xVelocity: -40 + (Math.random() * 80),
				yVelocity: -40 + (Math.random() * 80),
				// yForce: 0.4,
				drag: 0.1,
				startColor: 'hsla(' + (initialColor + i) + ', 80%, 50%, 0.01)',
				noiseType: 'random',
				noiseAmount: 10 
			});

			this.activeParticles.push(newParticle);
		}
	}

	end() {
		clearInterval(this.interval);
	}

}
