export default class ID {
	static #alphabet = 'abcdefghijklmnopqrstuvwxyz';
	static #numbers = '0123456789';
	static #dictionary = (ID.#alphabet + ID.#alphabet.toUpperCase() + ID.#numbers).split("");
	
	static #generateId() {
		let id = '';

		for (let i = 0; i < 10; i++) {
			let randomIndex = Math.floor(Math.random() * ID.#dictionary.length);
			let randomChar = ID.#dictionary[randomIndex];
			id += randomChar;
		}

		return id;
	}

	static withPrefix(prefix) {
		return `${prefix}-${ID.#generateId()}`;
	}
}