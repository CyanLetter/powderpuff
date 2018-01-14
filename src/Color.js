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
				start: 'hsla(27, 38%, 30%, 0.05)',
				end: 'hsla(27, 38%, 15%, 0.05)'
			},
			{ // magenta
				start: 'hsla(330, 100%, 50%, 0.05)',
				end: 'hsla(350, 80%, 50%, 0.05)'
			},
			{ // red-orange
				start: 'hsla(0, 100%, 58%, 0.05)',
				end: 'hsla(20, 100%, 45%, 0.05)'
			},
			{ // yellow
				start: 'hsla(52, 100%, 50%, 0.05)',
				end: 'hsla(40, 100%, 45%, 0.05)'
			}
		];
	}

	static get bahamas() {
		return [
			{ // blue-aqua
				start: 'hsla(176, 100%, 48%, 0.05)',
				end: 'hsla(158, 100%, 48%, 0.05)'
			},
			{ // aqua-green
				start: 'hsla(158, 100%, 48%, 0.05)',
				end: 'hsla(144, 80%, 48%, 0.05)'
			},
			{ // yellow-green
				start: 'hsla(71, 100%, 45%, 0.05)',
				end: 'hsla(58, 100%, 61%, 0.05)'
			},
			{ // yellow-orange
				start: 'hsla(54, 91%, 51%, 0.05)',
				end: 'hsla(39, 100%, 55%, 0.05)'
			},
			{ // deep blue
				start: 'hsla(202, 100%, 47%, 0.05)',
				end: 'hsla(222, 90%, 60%, 0.05)'
			}
		];
	}

	static get winter() {
		return [
			{ // ice ice baby
				start: 'hsla(201, 39%, 77%, 0.05)',
				end: 'hsla(185, 50%, 65%, 0.05)'
			},
			{ // turn around bright ice
				start: 'hsla(181, 100%, 77%, 0.05)',
				end: 'hsla(168, 100%, 85%, 0.05)'
			},
			{ // grey-test song in the world
				start: 'hsla(174, 5%, 62%, 0.05)',
				end: 'hsla(174, 5%, 100%, 0.05)'
			},
			{ // dark blue dark blue
				start: 'hsla(202, 54%, 61%, 0.05)',
				end: 'hsla(214, 76%, 78%, 0.05)'
			}
		];
	}

	static get solar() {
		return [
			{ // orange
				start: 'hsla(25, 100%, 50%, 0.05)',
				end: 'hsla(27, 100%, 60%, 0.05)'
			},
			{ // burnt sienna
				start: 'hsla(17, 100%, 35%, 0.05)',
				end: 'hsla(10, 100%, 30%, 0.05)'
			},
			{ // red blood cell
				start: 'hsla(0, 76%, 23%, 0.05)',
				end: 'hsla(0, 100%, 35%, 0.05)'
			},
			{ // bright red
				start: 'hsla(0, 81%, 47%, 0.05)',
				end: 'hsla(11, 100%, 40%, 0.05)'
			},
			{ // yellow
				start: 'hsla(46, 100%, 50%, 0.05)',
				end: 'hsla(42, 100%, 65%, 0.05)'
			}
		];
	}
}
