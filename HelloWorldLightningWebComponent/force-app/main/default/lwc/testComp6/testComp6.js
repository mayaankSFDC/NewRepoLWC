import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class TestComp6 extends LightningElement {
    @api indFields;
    @api objectApiName = 'Account';
    @api recordId;
    record = '';
    error = '';
    fieldsFormatted = ['Id'];

    @wire(getRecord, { recordId: '$recordId', fields: '$fieldsFormatted' })
    wiredRecord({data, error}) {
        if (data) {
            this.record = data;
            this.fValues = [];
            Object.keys(data.fields).forEach((field) => {
                this.fValues.push(data.fields[field].value);
            });
        } else if (error) {
            this.error = error;
        }
    }

    connectedCallback() {
        this.fieldsFormatted = (this.indFields || 'Id').split(';').map(field => this.objectApiName+'.'+field);
    }
}