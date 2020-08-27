import axios from 'axios';
import { User } from './models/User';

axios.defaults.baseURL = `${process.env.API_URL}`;

const user = new User({ name: 'Ada Lovelace', age: 19 });

user.on('save', () => {
	console.log(user);
});

user.save();
