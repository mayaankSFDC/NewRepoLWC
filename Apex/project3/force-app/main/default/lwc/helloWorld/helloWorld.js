import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'World';
  changeHandlerxxx(event) {
    this.greeting = event.target.value;
  }
}