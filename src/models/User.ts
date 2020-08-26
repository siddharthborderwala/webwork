import axios, { AxiosResponse } from 'axios';

interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

type Callback = () => void;

export class User {
	private events: { [key: string]: Callback[] } = {};

	constructor(private data: UserProps) {}

	get(propName: string): string | number {
		if (!this.data[propName]) throw new ReferenceError(`${propName} is not defined for User`);
		return this.data[propName];
	}

	set(update: UserProps): void {
		Object.assign<UserProps, UserProps>(this.data, update);
	}

	on(eventName: string, callback: Callback): void {
		this.events[eventName] = [...(this.events[eventName] || []), callback];
	}

	trigger(eventName: string): void {
		const handlers = this.events[eventName];

		if (!handlers || handlers.length === 0) return;

		handlers.forEach(callback => callback());
	}

	fetch(): void {
		axios.get(`users/${this.get('id')}`).then((response: AxiosResponse): void => {
			this.set(response.data);
		});
	}

	save(): void {
		const id = this.get('id');
		if (!!this.get('id')) {
			axios.put(`users${id}`, this.data);
		} else {
			axios.post(`users`, this.data);
		}
	}
}
