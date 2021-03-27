import { AxiosPromise, AxiosResponse } from 'axios';

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(event: string, cb: () => void): void;
  trigger(event: string): void;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(update: T): void;
}

interface withID {
  id?: number;
}

export class Model<T extends withID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
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
