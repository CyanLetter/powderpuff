export default class Ease {
	static lerp(value1, value2, t, ease) {
		if (ease) {
			t = ease(t);
		}
		return (1 - t) * value1 + t * value2;
	}

	static easeOutQuad(t) {
		return t * (2 - t);
	}
}
