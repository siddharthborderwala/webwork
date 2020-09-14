import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const user = User.buildUser({ name: 'NAME', age: 20 });
const root = document.getElementById('root');

if (!!root) {
	const userForm = new UserEdit(root, user);
	userForm.render();
	console.log(userForm);
} else {
	throw new Error('Root element not found');
}
