// Colorful Flak Burst effect
import Effect from './Effect.js';
import Particle from '../Particles/Particle.js';
import Box from '../Particles/Box.js';
import FastBlur from '../FastBlur.js';

export default class Radial extends Effect {
	constructor(parent, options) {
		super(parent, options);
	}

	init() {
		// this.ctx.globalAlpha = 0.3;
		// this.ctx.globalCompositeOperation = 'overlay';
		this.makeRings();
	}

	makeRings() {
		let centerX = (Math.random() * (this.canvas.width / 2)) + (this.canvas.width / 4);
		let centerY = (Math.random() * (this.canvas.width / 2)) + (this.canvas.width / 4);
		// let initialColor = Math.floor(Math.random() * 360);

		// layer 1
		for (let i = 0; i < 3; i++) {
			let randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
			let newParticle = new Box(this.pctx, {
				lifetime: 1500,
				xPos: centerX,
				yPos: centerY,
				width: 50,
				height: 100,
				offsetY: 50,
				rotation: Math.random() * 360,
				angularVelocity: 8 * (i > 0 ? 1 : -1),
				drag: 0.05,
				startColor: randColor.start,
				endColor: randColor.end
			});

			this.activeParticles.push(newParticle);
		}

		// layer 2
		for (let i = 0; i < 5; i++) {
			let randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
			let newParticle = new Box(this.pctx, {
				lifetime: 1500,
				xPos: centerX,
				yPos: centerY,
				width: 20,
				height: 100 + (Math.random() * 50),
				offsetY: 225,
				rotation: Math.random() * 360,
				angularVelocity: 5 * (Math.random() > 0.5 ? 1 : -1),
				drag: 0.1,
				startColor: randColor.start,
				endColor: randColor.end,
				// noiseType: 'random',
				// noiseAmount: 3
			});

			this.activeParticles.push(newParticle);
		}


		// layer 3
		for (let i = 0; i < 15; i++) {
			let randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
			let newParticle = new Box(this.pctx, {
				lifetime: 2500,
				xPos: centerX,
				yPos: centerY,
				width: 10,
				height: 150 + (Math.random() * 100),
				offsetY: 325,
				rotation: Math.random() * 360,
				angularVelocity: 8 * (Math.random() > 0.5 ? 1 : -1),
				drag: 0.5,
				startColor: randColor.start,
				endColor: randColor.end,
				// noiseType: 'random',
				// noiseAmount: 3
			});

			this.activeParticles.push(newParticle);
		}

		// layer 4
		for (let i = 0; i < 50; i++) {
			let randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
			let newHeight = 200 + (Math.random() * 400);
			let newParticle = new Box(this.pctx, {
				lifetime: 3000,
				xPos: centerX,
				yPos: centerY,
				width: 2,
				height: newHeight,
				offsetY: (Math.random() * 500) + (newHeight / 2),
				rotation: Math.random() * 360,
				angularVelocity: 0.5 * (Math.random() > 0.5 ? 1 : -1),
				drag: 0.02,
				startColor: randColor.start,
				endColor: randColor.end,
				// noiseType: 'random',
				// noiseAmount: 1
			});

			this.activeParticles.push(newParticle);
		}
	}

	// update(timestamp) {
	// 	super.update(timestamp);
	// 	FastBlur.extremeFractalBlur(this.canvas, this.ctx, 8);
	// }

	end() {
		clearInterval(this.interval);
	}

}
