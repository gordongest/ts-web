import { Model } from '../models/Model'

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string] : () => void }
  abstract template(): string

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
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

  render(): void {
    const templateElement = document.createElement('template'); /* create an element of type template */

      templateElement.innerHTML = this.template(); /* set its inner content to the output of template method */

      this.bindEvents(templateElement.content); /* bind events */

      this.parent.innerHTML = ''; /* empty the parent element */

      this.parent.append(templateElement.content); /* append template to the parent element */
  }
}