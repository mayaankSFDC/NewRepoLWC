import { LightningElement, api, track } from 'lwc';

export default class CustomCard extends LightningElement {
    @api sectionName;
    @api Tag1;
    @api Tag2;
    @api Tag3;

}