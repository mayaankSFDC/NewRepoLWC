import { LightningElement, api, wire, track } from 'lwc'; 
import updateRecord from '@salesforce/apex/CreateUpdateRecord.updateRecord';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { getRecord, getFieldValue, getPicklistValues } from 'lightning/uiRecordApi';

const fields = [NAME_FIELD, INDUSTRY_FIELD];

export default class TestUpdateRecordByApex extends LightningElement {
@api recordId; 
accountName; 
@track accountIndustry;
@track value = ''; 
@track selectedOption;
@track options;

  // private
  _recordTypeId;

  /* @wire(getRecord, { recordId: '$recordId', fields })
    account;

    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    } */

/* ******WRITING:CODE TO FETCH PICKLIST VALUES   :****** */
    // Step 1
     @wire(getRecord, {recordId:'$recordId', fields})
    account({error, data}) {
        if (data) {
        let industryValue = getFieldValue(data, INDUSTRY_FIELD);
        this.selectedOption = industryValue;
        this._recordTypeId = '012000000000000AAA'; // THIS IS DEFUALT RECORDTYPEID FOR ACCOUNT. setting this value will re-invoke the wire
        } else if (error) {
        console.log(error);
        }
    } 

    // Step 2, determined by when the reactive bind is changed
     @wire(getPicklistValues, { recordTypeId: '$_recordTypeId', fieldApiName: INDUSTRY_FIELD })
    setPicklistOptions({error, data}) {
        if (data) { */
        // Apparently combobox doesn't like it if you dont supply any options at all.
        // Even though selectedOption was assigned in step 1, it wont "select" it unless it also has options
         this.options = data.values;
        } else if (error) {
        console.log(error);
        } 
    }
/* ******ENDING: CODE TO FETCH PICKLIST VALUES  :****** */

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
    })
    .catch(error=>{
        console.error(''+JSON.stringify(error));
    })
}
}
