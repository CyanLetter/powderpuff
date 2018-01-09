import Ease from './Ease.js';
import Effect from './Effects/Effect.js'; // default effect
import PrismaFlak from './Effects/PrismaFlak.js'; // color bursts
import WispTest from './Effects/WispTest.js'; // Wisp default effect

export default class Powderpuff {
	constructor(options) {
		options = options || {};

		this.container = options.container;

		// dimensions of the canvas to create. Canvas is always a square for now
		this.canvasSize = options.canvasSize || 1024;

		this.debug = options.debug;

		this.init();
	}

	init() {
		console.log('powdering...');

		if (typeof this.container === 'undefined') {
			// generate our own container
			this.container = document.createElement('div');
			this.container.style.position = 'fixed';
			this.container.style.top = '0';
			this.container.style.right = '0';
			this.container.style.bottom = '0';
			this.container.style.left = '0';
			this.container.style.overflow = 'hidden';

			document.body.insertBefore(this.container, document.body.firstChild);
		}
		
		// create our canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.canvas.height = this.canvasSize;
		this.canvas.style.position = 'absolute';
		this.canvas.style.top = '50%';
		this.canvas.style.left = '50%';
		this.container.appendChild(this.canvas);

		// get main canvas context
		this.ctx = this.canvas.getContext('2d');

		// add registration marks for debugging
		if (this.debug === true) {
			this.ctx.fillStyle = 'red';
			this.ctx.strokeStyle = 'red';

			this.ctx.beginPath();
			this.ctx.moveTo(50, 50);
			this.ctx.lineTo(this.canvasSize - 50, this.canvasSize - 50);
			this.ctx.stroke();

			this.ctx.beginPath();
			this.ctx.moveTo(this.canvasSize - 50, 50);
			this.ctx.lineTo(50, this.canvasSize - 50);
			this.ctx.stroke();
			// tl
			this.ctx.beginPath();
			this.ctx.arc(50, 50, 50, 0, Math.PI * 2, false);
			this.ctx.fill();
			// tr
			this.ctx.beginPath();
			this.ctx.arc(this.canvasSize - 50, 50, 50, 0, Math.PI * 2, false);
			this.ctx.fill();
			// bl
			this.ctx.beginPath();
			this.ctx.arc(50, this.canvasSize - 50, 50, 0, Math.PI * 2, false);
			this.ctx.fill();
			// br
			this.ctx.beginPath();
			this.ctx.arc(this.canvasSize - 50, this.canvasSize - 50, 50, 0, Math.PI * 2, false);
			this.ctx.fill();
			// ctr
			this.ctx.beginPath();
			this.ctx.arc(this.canvasSize / 2, this.canvasSize / 2, 50, 0, Math.PI * 2, false);
			this.ctx.fill();
		}

		// active effect canvases to run
		this.activeEffects = [];

		this.resize();
		window.addEventListener('resize', e => this.resize(e));

		requestAnimationFrame(e => this.update(e));
	}

	puff(effect, colors) {
		let newEffect;

		switch (effect) {
		case 'test':
			newEffect = new Effect(this, {
				lifetime: 1000,
				endScale: 1.2
			});
			break;
		case 'wispTest':
			newEffect = new WispTest(this, {
				lifetime: 5000,
				endScale: 2
			});
			break;
		case 'flak':
			newEffect = new PrismaFlak(this, {
				lifetime: 5000,
				endScale: 1.2
			});
			
			break;
		}

		this.activeEffects.push(newEffect);
	}

	update(timestamp) {
		// update effects
		for (let i = 0; i < this.activeEffects.length; i++) {
			this.activeEffects[i].update(timestamp);
			this.ctx.drawImage(this.activeEffects[i].canvas, 0, 0);
		}
		// remove dead effects
		for (let i = this.activeEffects.length - 1; i >= 0; i--) {
			if (this.activeEffects[i].isDead) {
				this.activeEffects[i] = null;
				this.activeEffects.splice(i, 1);
			}
		}

		requestAnimationFrame(e => this.update(e));
	}

	resize() {
		// resize canvas to center cut
		let width = window.innerWidth;
		let height = window.innerHeight;
		let aspect = width / height;
		let scale = 1;

		if (aspect >= 1) {
			// landscape, make width match
			scale = width / this.canvasSize;
		} else {
			// portrait, make height match
			scale = height / this.canvasSize;
		}

		let newTransform = 'translate(-50%, -50%) scale(' + scale + ')';

		this.canvas.style.transform = newTransform;
	}
}

