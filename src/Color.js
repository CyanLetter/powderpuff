import Ease from './Ease.js';

export class Color {
	constructor(startColor, endColor) {
		// assume same format for start and end colors
		this.colorType = this.getColorType(startColor);
		this.startColor = this.decomposeColor(startColor);
		this.endColor = this.decomposeColor(endColor);
	}

	lerp(t) {

		let lerpColor = {
			x: Ease.lerp(this.startColor.x, this.endColor.x, t),
			y: Ease.lerp(this.startColor.y, this.endColor.y, t),
			z: Ease.lerp(this.startColor.z, this.endColor.z, t),
			a: Ease.lerp(this.startColor.a, this.endColor.a, t)
		};

		// console.log(lerpColor.x);
		lerpColor = this.recomposeColor(lerpColor);

		return lerpColor;
	}

	// extract values from both rgba and hsla
	// always convert to individual generic xyza values
	decomposeColor(color) {
		let colorRegex = new RegExp(/\((-?\d\d?\d?),\s?(\d\d?\d?)%?,\s?(\d\d?\d?)%?,\s?(\d\.?\d?\d?\d?)\)/, 'i');
		let decomposed = color.match(colorRegex);
		// console.log(decomposed);

		return {
			x: decomposed[1],
			y: decomposed[2],
			z: decomposed[3],
			a: decomposed[4]
		};
	}

	recomposeColor(color) {
		switch (this.colorType) {
		case 'hex':
			// TODO: Handle Hex
			return '#ff0000';
		case 'rgba':
			return 'rgba(' + color.x + ', ' + color.y + ', ' + color.z + ', ' + color.a + ')';
		case 'hsl':
			return 'hsla(' + color.x + ', ' + color.y + '%, ' + color.z + '%, ' + color.a + ')';
		default:
			return null;
		}
	}

	getColorType(color) {
		switch (color[0]) {
		case '#':
			return 'hex';
		case 'r':
			return 'rgba';
		case 'h':
			return 'hsl';
		default:
			return null;
		}
	}
}

export class ColorThemes {
	static get meteor() {
		return [
			{ // brown
				start: 'hsla(27, 38%, 30%, 1)',
				end: 'hsla(27, 38%, 15%, 1)'
			},
			{ // magenta
				start: 'hsla(330, 100%, 50%, 1)',
				end: 'hsla(350, 80%, 50%, 1)'
			},
			{ // red-orange
				start: 'hsla(0, 100%, 58%, 1)',
				end: 'hsla(20, 100%, 45%, 1)'
			},
			{ // yellow
				start: 'hsla(52, 100%, 50%, 1)',
				end: 'hsla(40, 100%, 45%, 1)'
			}
		];
	}

	static get bahamas() {
		return [
			{ // blue-aqua
				start: 'hsla(176, 100%, 48%, 1)',
				end: 'hsla(158, 100%, 48%, 1)'
			},
			{ // aqua-green
				start: 'hsla(158, 100%, 48%, 1)',
				end: 'hsla(144, 80%, 48%, 1)'
			},
			{ // yellow-green
				start: 'hsla(71, 100%, 45%, 1)',
				end: 'hsla(58, 100%, 61%, 1)'
			},
			{ // yellow-orange
				start: 'hsla(54, 91%, 51%, 1)',
				end: 'hsla(39, 100%, 55%, 1)'
			},
			{ // deep blue
				start: 'hsla(202, 100%, 47%, 1)',
				end: 'hsla(222, 90%, 60%, 1)'
			}
		];
	}

	static get winter() {
		return [
			{ // ice ice baby
				start: 'hsla(201, 39%, 77%, 1)',
				end: 'hsla(185, 50%, 65%, 1)'
			},
			{ // turn around bright ice
				start: 'hsla(181, 100%, 77%, 1)',
				end: 'hsla(168, 100%, 85%, 1)'
			},
			{ // grey-test song in the world
				start: 'hsla(174, 5%, 62%, 1)',
				end: 'hsla(174, 5%, 100%, 1)'
			},
			{ // dark blue dark blue
				start: 'hsla(202, 54%, 61%, 1)',
				end: 'hsla(214, 76%, 78%, 1)'
			}
		];
	}

	static get solar() {
		return [
			{ // orange
				start: 'hsla(25, 100%, 50%, 1)',
				end: 'hsla(27, 100%, 60%, 1)'
			},
			{ // burnt sienna
				start: 'hsla(17, 100%, 35%, 1)',
				end: 'hsla(10, 100%, 30%, 1)'
			},
			{ // red blood cell
				start: 'hsla(0, 76%, 23%, 1)',
				end: 'hsla(0, 100%, 35%, 1)'
			},
			{ // bright red
				start: 'hsla(0, 81%, 47%, 1)',
				end: 'hsla(11, 100%, 40%, 1)'
			},
			{ // yellow
				start: 'hsla(46, 100%, 50%, 1)',
				end: 'hsla(42, 100%, 65%, 1)'
			}
		];
	}

	static get random() {
		let rand = Math.random();
		if (rand < 0.25) {
			return this.meteor;
		} else if (rand < 0.5) {
			return this.bahamas;
		} else if (rand < 0.75) {
			return this.winter;
		} else {
			return this.solar;
		}
	}
}
