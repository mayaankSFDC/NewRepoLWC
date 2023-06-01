/* This component is made to peform update using record edit form */
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
 import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
export default class PerformSave extends LightningElement {
    accountName = ACCOUNT_NAME;
     accountType = ACCOUNT_TYPE;
    @api recordId;
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
    }
    handleSuccess(event) {
        if(this.recordId !== null){
            this.dispatchEvent(new ShowToastEvent({
                    title: "SUCCESS!",
                    message: "This record has been updated.",
                   variant: "success",
                }),  
           );    
        //console.log('onsuccess event recordEditForm', event.detail.id);
    }
}
}