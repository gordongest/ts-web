import { Eventing } from './Eventing';
import { Sync } from './APISync';
import { Attributes } from './Atrributes';
import { AxiosResponse } from 'axios';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const url: string = 'http://localhost:3000/users';

export class User {
  constructor(private data: UserProps) {
    this.attributes = new Attributes(data);
  }

  private events: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync<UserProps>(url);
  private attributes: Attributes<UserProps>;

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => this.trigger('save'))
      .catch(() => this.trigger('err'));
  }
}
