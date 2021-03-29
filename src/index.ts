import { User } from './models/User';
import { UserForm } from './views/UserForm';

const attrs = {
  name: 'Rongod',
  age: 90
}

const user = User.create(attrs)

const root = document.getElementById('root');

if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error('whoopsie')
}