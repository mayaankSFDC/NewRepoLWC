import { LightningElement,track, api } from 'lwc';
import createAccount from '@salesforce/apex/createAcc.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ModalPopupLWC extends LightningElement {
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;
    @api recordId;
    name = '';
    phone = '';
    connectedCallback(){
        this.name = '';
        this.phone = '';
    }
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen track value as false
        //Add your code to call apex method or do some processing
        
        createAcc({             
            name : this.name,
            phone : this.phone,
            parentRecordId : this.recordId 
        })
        .then(result => {
            console.log('Result \n ', result);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Account Created',
                variant: 'success'
            }));
            //this.closeAction();
        })
        .catch(error => {
            console.error('Error: \n ', error);
        })
        .finally(()=>{
            //this.isSpinner = false;
        })
        this.isModalOpen = false;
    }
}