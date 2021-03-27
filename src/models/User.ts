import { Model } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Collection } from './Collection';
import { APISync } from './APISync';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const url: string = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static create(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new APISync<UserProps>(url)
    );
  }

  static createCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      url,
      (json: UserProps): User => User.create(json)
    );
  }
}
