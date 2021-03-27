import { User } from './models/User'

const user = new User({name: 'Gordon', age: 36})

console.log(user)
console.log(user.get('name'))

user.set({name: 'nodroG'})
console.log(user.get('name'))