export default class Utilities {
	static shuffle(array) {
		let i = array.length, j, temp;
		
		if (i === 0) {
			return;
		}
		while (--i) {
			j = Math.floor(Math.random() * (i + 1));
			temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	static randFromArray(array) {
		return array[Math.floor(Math.random() * array.length)];
	}
}
