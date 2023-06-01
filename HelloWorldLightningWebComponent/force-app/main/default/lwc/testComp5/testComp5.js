// wireListInfosByName.js
import { LightningElement, wire } from 'lwc';
import { getListInfosByName } from 'lightning/uiListsApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class TestComp5 extends LightningElement {

    listInfos;
    @wire(getListInfosByName, {
        names: ['${ACCOUNT_OBJECT.objectApiName}.AllAccounts']
    })
    listInfo({ error, data }) {
        if (data) {
            this.listInfos = data.results.map(({ result }) => result);
        }
    }
}