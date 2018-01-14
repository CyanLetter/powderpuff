// Wisps flying across screen
import Effect from './Effect.js';
import Wisp from '../Particles/Wisp.js';

export default class Ribbons extends Effect {
	constructor(parent, options) {
		super(parent, options);
	}

	init() {
		this.makeWisp(0);
		setTimeout(() => this.makeWisp(1), 200);
		setTimeout(() => this.makeWisp(2), 400);
	}

	makeWisp(num) {
		let newParticle = new Wisp(this.pctx, {
			lifetime: 1500,
			size: 50,
			xPos: 0,
			yPos: (this.parent.canvasSize / 4) * (num + 1),
			xVelocity: 15,
			// yVelocity: -3,
			startRotation: 6.28 * 0.75,
			startColor: this.theme[num].start,
			endColor: this.theme[num].end,
			noiseType: 'wave',
			noiseAmount: 10,
			length: 100,
			thickness: 10,
			tailFreq: 0.05,
			tailAmp: 1
		});

		this.activeParticles.push(newParticle);
	}

	update(timestamp) {
		super.update(timestamp);

		// FastBlur.boxBlurCanvasRGBA(this.ctx, 0, 0, this.parent.canvasSize, this.parent.canvasSize, 5, 1);
		// FastBlur.extremeFractalBlur(this.canvas, this.ctx, 4);
	}
}
