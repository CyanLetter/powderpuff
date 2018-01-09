// Wisp Particle test effect
import Effect from './Effect.js';
import Wisp from '../Particles/Wisp.js';

export default class WispTest extends Effect {
	constructor(parent, options) {
		super(parent, options);
	}

	init() {
		let newParticle = new Wisp(this.pctx, {
			lifetime: 5000,
			size: 50,
			xPos: 0,
			yPos: this.parent.canvasSize / 2,
			xVelocity: 3,
			// yVelocity: -3,
			startRotation: 6.28 * 0.75,
			startColor: 'hsla(' + 0 + ', 80%, 50%, 0.05)',
			endColor: 'hsla(' + 60 + ', 80%, 50%, 0.05)',
			noiseType: 'wave',
			noiseAmount: 10,
			length: 100,
			thickness: 10,
			tailFreq: 0.05,
			tailAmp: 3
		});

		this.activeParticles.push(newParticle);
	}

}
