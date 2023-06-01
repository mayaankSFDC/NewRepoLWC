import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class TestComp7 extends LightningElement {
var1;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountObject({error, data}){
        if(data){
            console.log(data);
            var1=this.data;
        }else{
            console.log(error);
        }
    }
}