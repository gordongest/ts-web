import { User } from './models/User'

const user = new User({name: 'Gordon', age: 36})

user.on('change', () => {
  console.log('change')
})
user.on('change', () => {
  console.log('oh no')
})
user.on('click', () => {
  console.log('clikke')
})
user.on('save', () => {
  console.log('checkpoint')
})

user.trigger('click')
user.trigger('change')
user.trigger('save')