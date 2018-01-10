export default class FastBlur {
	static extremeFractalBlur(a, aCtx, iterations) {
		let x = 0;
		let y = 0;

		aCtx.globalAlpha = 1 / 2;
		for (let i = 0; i < iterations; ++i) {
			let direction = i % 4;
			let offset = i * 2 + 1;

			switch (direction) {
			case 0: // Up.
				y -= offset;
				break;
			case 1: // Right.
				x += offset;
				break;
			case 2: // Down.
				y += offset;
				break;
			case 3: // Left.
				x -= offset;
				break;
			}
			aCtx.drawImage(a, x, y);
		}
		aCtx.globalAlpha = 1;
	}
}
