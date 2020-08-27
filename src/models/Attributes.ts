export class Attributes<T> {
	constructor(private data: T) {}

	get = <K extends keyof T>(key: K): T[K] => {
		if (!this.data[key]) throw new ReferenceError(`${key} is not a defined property on User`);
		return this.data[key];
	};

	getAll(): T {
		return this.data;
	}

	set(update: T): void {
		Object.assign(this.data, update);
	}
}
