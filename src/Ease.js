export default class Ease {
	static lerp(value1, value2, amount) {
		return (1 - amount) * value1 + amount * value2;
	}
}
