import { UserProps } from './User';

export class Attributes<T> {
  constructor(private data: T) {}

  /* this function expects to take in an argument K which is a key of the object T.
  It then expects to return the value on the object T at key K */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  getAll = (): T => {
    return this.data;
  };

  set = (update: T): void => {
    Object.assign(this.data, update);
  };
}
