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
			{ // brown
				start: 'hsla(27, 38%, 16%, 0.05)',
				end: 'hsla(27, 38%, 10%, 0.05)'
			}
		];
	}

	static get solar() {
		return [
			{ // brown
				start: 'hsla(27, 38%, 16%, 0.05)',
				end: 'hsla(27, 38%, 10%, 0.05)'
			}
		];
	}

	/*
	meteor: [
		0x382719,
		0xff0280,
		0xff2828,
		0xfcc500,
		// 0xfc00c1
	],
	bahamas: [
		0x00f7e6,
		0x00f79c,
		0xaad100,
		0xf4de11,
		0x0099f2
	],
	winter: [
		0xadcbdb,
		0x8cfdff,
		0x99a3a2,
		0x66a9d1
	],
	solar: [
		0xff6a00,
		0xb53300,
		0x680e0e,
		0xd81717,
		0xffe100
	],
	*/
}
