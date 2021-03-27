import { User } from './models/User';

const collection = User.createCollection();

collection.on('change', () => {
  console.log(collection.models);
});

collection.fetch();
