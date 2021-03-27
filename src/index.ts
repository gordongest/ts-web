import { User } from './models/User'

const user = new User({name: 'Gordon', age: 36})
console.log(user.get('name'))

user.set({name: 'Rognod'})
console.log(user.get('name'))