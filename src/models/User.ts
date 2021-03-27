interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => {};

export class User {
  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(props: UserProps): void {
    Object.assign(this.data, props);
  }

  on(event: string, callback: Callback): void {
    
  }

  trigger() {}
}
