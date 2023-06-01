import { LightningElement,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import CLOSEDATE from '@salesforce/schema/Opportunity.CloseDate';

export default class PanelModalForm extends LightningElement {
    @track isShowModal = false;
    @track value='';
    opId='';
    cDate;
    oStage='';
    //lastName='';
    name = '';
    @track oppOption = [];
    get options() {
        return this.oppOption;
    }
    /* ******SECTION START: GETTING VALUES FROM OPPTY STAGE FIELD****** */
    /* connectedCallback() {
        getOppty() 
        .then(result => { 
            let arr = []; 
            for(var i=0; i<result.length; i++) {
                arr.push({ label :result[i].Name, value : result[i].id })
            }

            this.oppOption = arr;
        })
    } */

    handleChanged(event) {
        this.opId = undefined;
        this.name = event.target.value;
        
    }
    handleStageChange(event) {
        this.opId = undefined;
        this.oStage = event.target.value;
        
    }
    handleDateChange(event) {
        this.opId = undefined;
        this.cDate = event.target.value;
        
    }
    createOpp() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[OPPORTUNITY_STAGE.fieldApiName] = this.oStage;
        fields[CLOSEDATE.fieldApiName] = this.cDate;
        const recordInput = { apiName: OPPORTUNITY_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(opportunity => {
                this.opId = opportunity.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Opportunity created',
                        variant: 'success',
                    }),
                );
                
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }
}