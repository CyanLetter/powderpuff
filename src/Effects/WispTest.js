// Wisp Particle test effect
import Effect from './Effect.js';
import Wisp from '../Particles/Wisp.js';

export default class WispTest extends Effect {
	constructor(parent, options) {
		super(parent, options);
	}

	init () {
		let newParticle = new Wisp(this.pctx, {
			lifetime: 5000,
			size: 50,
			xPos: this.parent.canvasSize / 2,
			yPos: this.parent.canvasSize / 2,
			xVelocity: 3,
			yVelocity: -3,
			startRotation: 6.28 * 0.88,
			startColor: 'hsla(' + 0 + ', 50%, 50%, 0.008)',
			noiseType: 'wave',
			noiseAmount: 10,
			length: 100,
			thickness: 5,
			tailFreq: 0.05,
			tailAmp: 3
		});

		this.activeParticles.push(newParticle);
	}

}