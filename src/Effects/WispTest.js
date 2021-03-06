// Wisp Particle test effect
import Effect from './Effect.js';
import Wisp from '../Particles/Wisp.js';

export default class WispTest extends Effect {
	constructor(parent, options) {
		super(parent, options);
	}

	init() {
		let randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
		let newParticle = new Wisp(this.pctx, {
			lifetime: 5000,
			size: 50,
			xPos: 0,
			yPos: this.parent.canvasSize / 2,
			xVelocity: 3,
			// yVelocity: -3,
			startRotation: 6.28 * 0.75,
			startColor: randColor.start,
			endColor: randColor.end,
			noiseType: 'wave',
			noiseAmount: 10,
			length: 100,
			thickness: 10,
			tailFreq: 0.05,
			tailAmp: 3
		});

		this.activeParticles.push(newParticle);
	}

	update(timestamp) {
		super.update(timestamp);

		// FastBlur.boxBlurCanvasRGBA(this.ctx, 0, 0, this.parent.canvasSize, this.parent.canvasSize, 5, 1);
		// FastBlur.extremeFractalBlur(this.canvas, this.ctx, 4);
	}
}
