import axios from 'axios';
import { User } from './models/User';

const url = 'http://localhost:3000/users';
const user = {
  name: 'Rognod',
  age: 36,
};

// axios.post(url, user);

axios.get(`${url}/1`)
  .then((response) => console.log(response.data));
