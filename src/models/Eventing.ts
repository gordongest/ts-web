type Callback = () => void; // function that returns nothing

export class Eventing {

  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || []; // either empty array or current array of callbacks for event
    handlers.push(callback); // add new callback to array for event
    this.events[eventName] = handlers; // reassign array for event
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) {
      return;
    }

    handlers.forEach((callback) => callback());
  }

}