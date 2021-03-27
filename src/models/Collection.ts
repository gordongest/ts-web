import axios, { AxiosResponse } from 'axios';
import { UserProps } from './User';
import { User } from './User';
import { Eventing } from './Eventing';

export class Collection {
  constructor(public url: string) {}
  models: User[] = [];
  events: Eventing = new Eventing();

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.url).then((response: AxiosResponse) => {
      response.data.forEach((i: UserProps) => {
        const user = User.create(i);
        this.models.push(user);
      });

      this.trigger('change');
    });
  }
}
