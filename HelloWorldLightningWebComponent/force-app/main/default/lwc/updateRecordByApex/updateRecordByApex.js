import { LightningElement, api } from 'lwc'; 
import updateRecord from '@salesforce/apex/CreateUpdateRecord.updateRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

export default class UpdateRecordByApex extends LightningElement {
@api recordId; 
accountName; 
accountIndustry;

handleNameChange (event) {
    this.accountName = event.target.value; 
    console.log(" this.accountName: "+JSON.stringify( this.accountName))
}

handleIndustryChange (event){
    this.accountIndustry = event.target.value; 
    console.log(" this accountIndustry: "+JSON.stringify( this.accountIndustry))
}

onUpdateRecord(){
    updateRecord({accountId:this.recordId, accountNames: this.accountName, accountIdustries:this.accountIndustry})
    .then(accountDetails=>{
        console.log('accountDetails: '+JSON.stringify(accountDetails));
        getRecordNotifyChange([{recordId: this.recordId}]);  //:THIS IMPORTED PROPERTY HELPS IN REFRESHING LWC PAGE:
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Account updated',
                variant: 'success',
            }),
        );
    })
    .catch(error=>{
        console.error(''+JSON.stringify(error));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error Occured',
                variant: 'error',
            }),
        );
    })
}
}
