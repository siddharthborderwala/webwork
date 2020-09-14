import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:button.set-age': this.onSetAgeClick,
			'click:button.set-name': this.onSetNameClick,
			'click:button.save-model': this.onSaveClick,
		};
	}

	onSaveClick = (): void => {
		this.model.save();
	};

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
        <input placeholder="${this.model.get('name')}" />
				<button class="set-name">Change Name!</button>
				<button class="set-age">Set random age</button>
				<button class="save-model">Save</button>
      </div>
    `;
	}
}
