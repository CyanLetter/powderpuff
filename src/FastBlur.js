export default class FastBlur {
	static extremeFractalBlur(a, aCtx, iterations) {
		let x = 0;
		let y = 0;

		aCtx.globalAlpha = 0.2;
		let dirSeed = iterations < 4 ? Math.floor(Math.random() * 4) : 0;
		for (let i = 0; i < iterations; ++i) {
			let direction = (dirSeed + i) % 4;
			let offset = (Math.floor(i / 4) * 4) + 1;

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
