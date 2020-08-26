import axios from 'axios';
import { User } from './models/User';

axios.defaults.baseURL = `${process.env.API_URL}`;

const user = new User({ id: 1 });
user.fetch();
