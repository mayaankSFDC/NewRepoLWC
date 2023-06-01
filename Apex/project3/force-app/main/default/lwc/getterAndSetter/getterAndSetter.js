//We must import api here to use it
import {LightningElement, api} from 'lwc';


export default class GetterAndSetter extends LightningElement {
     //Public property
   @api person;
}