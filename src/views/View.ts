import { Model } from '../models/Model'

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string

  eventsMap(): { [key: string] : () => void } {
    return {}
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }

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

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for(let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  render(): void {
    const templateElement = document.createElement('template'); /* create an element of type template */

      templateElement.innerHTML = this.template(); /* set its inner content to the output of template method */

      this.bindEvents(templateElement.content); /* bind events */

      this.mapRegions(templateElement.content)

      this.parent.innerHTML = ''; /* empty the parent element */

      this.parent.append(templateElement.content); /* append template to the parent element */
  }
}