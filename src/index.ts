import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

const attrs = {
  name: 'Rongod',
  age: 90
}

const user = User.create(attrs)

const root = document.getElementById('root');

if (root) {
  const userEdit = new UserEdit(root, user);

  userEdit.render();
} else {
  throw new Error('whoopsie')
}