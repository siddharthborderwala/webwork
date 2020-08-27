import axios from 'axios';
import { User } from './models/User';

axios.defaults.baseURL = `${process.env.API_URL}`;
