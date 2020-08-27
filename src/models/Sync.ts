import axios, { AxiosPromise } from 'axios';

interface HasId {
	id?: number;
}

export class Sync<T extends HasId> {
	constructor(public resource: string) {}

	fetch(id: number): AxiosPromise {
		return axios.get(`${this.resource}/${id}`);
	}

	save(data: T): AxiosPromise {
		const { id } = data;

		return !!id
			? axios.put(`${this.resource}/${id}`, data)
			: axios.post(`${this.resource}`, data);
	}
}
