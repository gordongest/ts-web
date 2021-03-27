import axios, { AxiosPromise } from 'axios';
import { UserProps } from './User';

export class Sync<T> {
  constructor(public url: string) {}

  fetch(id: number, data: UserProps): AxiosPromise {
    return axios.get(`${this.url}/${id}`);
  }

  save(data: UserProps): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.url}/${id}`, data);
    } else {
      return axios.post(this.url, data);
    }


  }
}
