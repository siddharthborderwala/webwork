import { User } from '../models/User';

export class UserForm {
	constructor(public parent: Element, public model: User) {
		this.bindModel();
	}

	bindModel(): void {
		this.model.on('change', (): void => {
			this.render();
		});
	}

	eventsMap(): { [key: string]: () => void } {
		return {
			'click:button.set-age': this.onSetAgeClick,
			'click:button.set-name': this.onSetNameClick,
		};
	}

	onSetNameClick = (): void => {
		const input = this.parent.querySelector('input');

		if (!!input)
			this.model.set({
				name: input.value.trim(),
			});
	};

	onSetAgeClick = (): void => {
		this.model.setRandomAge();
	};

	template(): string {
		return `
      <div>
        <h1>User Form</h1>
				<div>User name: ${this.model.get('name')}</div>
				<div>User age: ${this.model.get('age')}</div>
        <input />
				<button class="set-name">Change Name!</button>
				<button class="set-age">Set random age</button>
      </div>
    `;
	}

	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();

		for (let eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':');

			fragment.querySelectorAll(selector).forEach(element => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			});
		}
	}

	render(): void {
		this.parent.innerHTML = '';

		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();

		this.bindEvents(templateElement.content);

		this.parent.append(templateElement.content);
	}
}
