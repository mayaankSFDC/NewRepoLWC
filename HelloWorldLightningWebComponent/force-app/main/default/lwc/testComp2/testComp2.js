// apexStaticSchema.js
import { LightningElement, wire } from 'lwc';
import { getSObjectValue } from '@salesforce/apex';
import getSingleAccount from '@salesforce/apex/AccountControllerLWC.getSingleAccount';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class TestComp2 extends LightningElement {
    @wire(getSingleAccount) account;

    get name() {
        return this.contact.data ? getSObjectValue(this.contact.data, NAME_FIELD) : '';
    }
    get industry() {
        return this.contact.data ? getSObjectValue(this.contact.data, INDUSTRY_FIELD) : '';
    }
    get phone() {
        return this.contact.data ? getSObjectValue(this.contact.data, PHONE_FIELD) : '';
    }
}