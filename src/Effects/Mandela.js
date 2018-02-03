// Colorful Flak Burst effect
import Effect from './Effect.js';
import Particle from '../Particles/Particle.js';

export default class Mandela extends Effect {
	constructor(parent, options) {
		super(parent, options);

		this.d2r = Math.PI / 180;
		this.center = this.canvas.width / 2;
		this.diameter = Math.floor(Math.random() * 200);
		this.maxVelocity = 2 + (Math.random() * 14);
	}

	init() {
		// let symmetry = 16;
		let symmetry = 4 + (2 * Math.floor(Math.random() * 9));

		for (let i = 0; i < 5; i++) {
			this.makeMandelbrot(300 / symmetry);
		}
		
	}

	makeMandelbrot(symmetry) {
		let steps = (360 / symmetry) * this.d2r;
		let randColor = this.theme[Math.floor(Math.random() * this.theme.length)];
		
		let xMod = Math.random() * this.diameter;
		let yMod = Math.random() * this.diameter;
		let xVelocity = Math.random() * this.maxVelocity * (Math.random() > 0.5 ? 1 : -1);
		let yVelocity = Math.random() * this.maxVelocity * (Math.random() > 0.5 ? 1 : -1);
		let xForce = Math.random() * 0.1 * Math.sign(-xVelocity);
		let yForce = Math.random() * 0.1 * Math.sign(-yVelocity);

		// if (Math.abs(xVelocity) > Math.abs(yVelocity)) {
		// 	xForce = -xVelocity * 0.01;
		// } else {
		// 	yForce = -yVelocity * 0.01;
		// }

		for (let i = 0; i < symmetry; i++) {
			let curStep = (steps / 2) + (i * steps);
			let sin = Math.sin(curStep);
			if (sin > 3.14) {
				sin *= -1;
			}

			let cos = Math.cos(curStep);
			if (cos > 1.57 && cos < 4.71) {
				// negative
				cos *= -1;
			}

			let newParticle = new Particle(this.pctx, {
				lifetime: 5000,
				size: 2 + (Math.random() * 10),
				xPos: (sin * xMod) + this.center,
				yPos: (cos * yMod) + this.center,
				xVelocity: (sin * xVelocity),
				yVelocity: (cos * yVelocity),
				xForce: (sin * xForce),
				yForce: (cos * yForce),
				offsetY: Math.random() * 50,
				angularVelocity: (Math.random() * 20) - 10,
				startColor: randColor.start,
				endColor: randColor.end
			});

			this.activeParticles.push(newParticle);
		}
	}

}
