import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

/* USERS EXAMPLE */
/* Take in types User (T), UserProps (K) */
export class Collection<T, K> {
  /* deserialize takes a function which takes argument of type UserProps (K) and returns a User (T) */
  constructor(public url: string, public deserialize: (json: K) => T) {}

  /* models is an array of Users (T) */
  models: T[] = [];
  events: Eventing = new Eventing();

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.url).then((response: AxiosResponse) => {
      /* loop through the array, object at each index is of type UserProps (K) */
      response.data.forEach((i: K) => {
        /* call deserialize (which is being given User.create) on index */
        /* add new User (T) instance to array of type User (T[]) */
        this.models.push(this.deserialize(i));
      });

      this.trigger('change');
    });
  }
}
