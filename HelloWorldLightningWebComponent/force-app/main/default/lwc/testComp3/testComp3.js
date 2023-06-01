import { LightningElement, api, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const fields = [INDUSTRY_FIELD];

export default class TestComp3 extends LightningElement {
  @api recordId;
  @track selectedOption;
  @track options;

  // private
  _recordTypeId;

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
    if (data) {
      // Apparently combobox doesn't like it if you dont supply any options at all.
      // Even though selectedOption was assigned in step 1, it wont "select" it unless it also has options
      this.options = data.values;
    } else if (error) {
      console.log(error);
    }
  }

}