import Ease from './Ease.js';

export default class Color {
	constructor (startColor, endColor) {
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
		// console.log(lerpColor);
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
		}
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
		}
	}
}
