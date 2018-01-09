import Ease from './Ease.js';

export default class Color {
	static lerp(startColor, endColor, t) {
		let startColorType = this.getColorType(startColor);
		let endColorType = this.getColorType(endColor);

		startColor = this.decomposeColor(startColor, startColorType);
		endColor = this.decomposeColor(endColor, endColorType);

		let lerpColor = {
			x: Ease.lerp(startColor.x, endColor.x, t),
			y: Ease.lerp(startColor.y, endColor.y, t),
			z: Ease.lerp(startColor.z, endColor.z, t),
			a: Ease.lerp(startColor.a, endColor.a, t)
		};
		// console.log(lerpColor);
		lerpColor = this.recomposeColor(lerpColor, startColorType);

		return lerpColor;
	}

	// extract values from both rgba and hsla
	// always convert to individual generic xyza values
	static decomposeColor(color) {
		let colorRegex = new RegExp(/\((-?\d\d?\d?),\s?(\d\d?\d?)%?,\s?(\d\d?\d?)%?,\s?(\d\.?\d?\d?\d?)\)/, 'i');
		let decomposed = color.match(colorRegex);
		// console.log(decomposed);

		return {
			x: decomposed[1],
			y: decomposed[2],
			z: decomposed[3],
			a: decomposed[4]
		}
	}

	static recomposeColor(color, type) {
		switch (type) {
			case 'hex':
				// TODO: Handle Hex
				return '#ff0000';
			case 'rgba':
				return 'rgba(' + color.x + ', ' + color.y + ', ' + color.z + ', ' + color.a + ')';
			case 'hsl':
				return 'hsla(' + color.x + ', ' + color.y + '%, ' + color.z + '%, ' + color.a + ')';
		}
	}

	static getColorType(color) {
		switch (color[0]) {
			case '#':
				return 'hex';
			case 'r':
				return 'rgba';
			case 'h':
				return 'hsl';
		}
	}
}
