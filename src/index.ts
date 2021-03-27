// import axios from 'axios';
import { User } from './models/User';

const user = new User({ id: 2, name: 'Groond', age:54 })

user.on('save', () => {
  console.log(user)
})

user.save();