import { Model } from './Model';
import { Attributes } from './Atrributes';
import { Eventing } from './Eventing';
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
    )
  }
}
