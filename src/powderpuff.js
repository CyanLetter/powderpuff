import Ease from './Ease.js';
import Effect from './Effects/Effect.js'; // default effect

export default class Powderpuff {
	constructor(options) {
		options = options || {};

		this.container = options.container;

		// dimensions of the canvas to create. Canvas is always a square for now
		this.canvasSize = options.canvasSize || 2000;

		this.debug = options.debug;

		this.init();
	}

	init() {
		console.log('powdering...');

		if (typeof this.container === 'undefined') {
			// generate our own container
			this.container = document.createElement('div');
			this.container.style = 'position: fixed; top: 0; right: 0; bottom: 0; left: 0; overflow: hidden;';

			document.body.insertBefore(this.container, document.body.firstChild);
		}
		
		// create our canvas
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.canvas.height = this.canvasSize;
		this.canvas.style = 'position: absolute; top: 50%; left: 50%;';
		this.container.appendChild(this.canvas);

		// get main canvas context
		this.ctx = this.canvas.getContext('2d');

		// add registration marks for debugging
		if (this.debug === true) {
			this.ctx.fillStyle = 'red';
			this.ctx.strokeStyle = 'red';

			this.ctx.beginPath();
			this.ctx.moveTo(50, 50);
			this.ctx.lineTo(1950, 1950);
			this.ctx.stroke();

			this.ctx.beginPath();
			this.ctx.moveTo(1950, 50);
			this.ctx.lineTo(50, 1950);
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
			newEffect = new Effect(this);
			this.activeEffects.push(newEffect);
			break;
		}
	}

	update(timestamp) {
		for (let i = 0; i < this.activeEffects.length; i++) {
			this.activeEffects[i].update(timestamp);
			this.ctx.drawImage(this.activeEffects[i].canvas, 0, 0);
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

