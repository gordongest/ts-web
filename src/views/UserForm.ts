import { User } from '../models/User';
import { View } from './View';

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
    };
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User Name: ${this.model.get('name')}</div>
        <div>User Age: ${this.model.get('age')}</div>
        <input />
        <button class="set-name">change name</button>
        <button class="set-age">set random age</button>
      </div>
    `;
  }

  render(): void {
    const templateElement = document.createElement('template'); /* create an element of type template */

      templateElement.innerHTML = this.template(); /* set its inner content to the output of template method */

      this.bindEvents(templateElement.content); /* bind events */

      this.parent.innerHTML = ''; /* empty the parent element */

      this.parent.append(templateElement.content); /* append template to the parent element */
  }
}
