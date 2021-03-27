import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const url: string = 'http://localhost:3000/users';

export class User {
  constructor(private data: UserProps) {}

  public events: Eventing = new Eventing();

  public sync: Sync<UserProps> = new Sync<UserProps>(url);

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(props: UserProps): void {
    Object.assign(this.data, props);
  }
}
