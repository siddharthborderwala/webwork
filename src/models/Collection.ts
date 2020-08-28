import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';

export class Collection<T, K> {
	models: T[] = [];
	events: Eventing = new Eventing();

	constructor(public resourceUrl: string, public builder: (json: K) => T) {}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	fetch(): void {
		axios.get(this.resourceUrl).then((response: AxiosResponse): void => {
			this.models.push(response.data.map((value: K) => this.builder(value)));
		});

		this.trigger('change');
	}
}
