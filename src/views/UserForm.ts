export class UserForm {
  constructor(public parent: Element) {}

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input />
      </div>
    `;
  }

  render(): void {
    const templateElement = document.createElement('template'); /* create an element of type template */

    templateElement.innerHTML = this.template(); /* set its inner content to the output of template method */

    this.parent.append(templateElement.content); /* append it to the parent element */
  }
}
