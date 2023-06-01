/* This component is made to peform update using record edit form */
import { LightningElement, api } from 'lwc';
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
 import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
 import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
 import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';

export default class PerformUpdateOnContact extends LightningElement { 
     accountName = ACCOUNT_NAME;
     accountType = ACCOUNT_TYPE;
     accountPhone= ACCOUNT_PHONE;
     accountRating= ACCOUNT_RATING;
     @api recordId;
     //selectedFields = [ACCOUNT_NAME, ACCOUNT_TYPE, ACCOUNT_PHONE, ACCOUNT_RATING];
     handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
    }
     handleSuccess(event){
         if(this.recordId !== null){
             this.dispatchEvent(new ShowToastEvent({
                     title: "SUCCESS!",
                     message: "This record has been updated.",
                    variant: "success",
                 }),  
            );    
          }
     } }