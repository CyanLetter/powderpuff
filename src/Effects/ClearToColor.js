// Clear Canvas to specified color
import Effect from './Effect.js';
import Particle from '../Particles/Particle.js';

export default class ClearToColor extends Effect {
	constructor(parent, options) {
		super(parent, options);

		console.log(options.color);
		// wipe to white by default
		this.wipeColor = options.color || 'hsla(0, 0%, 0%, 1)';
	}

	init() {
		this.burst();
	}

	burst() {

		for (let i = 0; i < 5; i++) {
			let newParticle = new Particle(this.pctx, {
				lifetime: 500,
				size: 1000,
				xPos: Math.random() * this.canvas.width,
				yPos: Math.random() * this.canvas.width,
				startScale: 0.1,
				endScale: 1,
				startColor: this.wipeColor,
				endColor: this.wipeColor,
				noiseType: 'random',
				noiseAmount: 10 
			});

			this.activeParticles.push(newParticle);
		}
	}

}
