export default class Noise {
	static random(amount) {
		return {
			x: -amount + (Math.random() * (amount * 2)),
			y: -amount + (Math.random() * (amount * 2))
		};
	}

	// perlin

	//brownian
}
