import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { Sync } from './Sync';
import { AxiosResponse } from 'axios';

const resource: string = 'users';

export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

export class User {
	private events: Eventing = new Eventing();
	private sync: Sync<UserProps> = new Sync<UserProps>(resource);
	private attributes: Attributes<UserProps>;

	constructor(attrs: UserProps) {
		this.attributes = new Attributes<UserProps>(attrs);
	}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	get get() {
		return this.attributes.get;
	}

	set(update: UserProps): void {
		this.attributes.set(update);
		this.events.trigger('change');
	}

	fetch(): void {
		const id = this.attributes.get('id');

		if (typeof id !== 'number') throw new Error('Cannot fetch without an id');

		this.sync.fetch(id).then((response: AxiosResponse): void => {
			this.set(response.data);
		});
	}

	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((response: AxiosResponse): void => {
				this.set({ id: response.data['id'] });
				this.trigger('save');
			})
			.catch(error => {
				this.trigger('error');
			});
	}
}
