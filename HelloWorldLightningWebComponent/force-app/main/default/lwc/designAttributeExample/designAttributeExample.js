import { LightningElement, api } from 'lwc';

export default class DesignAttributeExample extends LightningElement {
    @api firstName ='Amit';
    @api strTitle ='Welcome in Salesforce';
    @api showImage =false;
    @api imgUrl ='';
}