import { LightningElement, api, wire } from 'lwc';
import getAccount from '@salesforce/apex/TestAccountClass.getAccount';
import updateAccountDetails from '@salesforce/apex/TestAccountClass.updateAccountDetails';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const columns = [
    {label: 'Account Name', fieldName:'Name', editable:true},
    {label: 'Website', fieldName:'Website', type: 'url', editable:true},
    {label: 'Phone', fieldName:'Phone', type:'phone', editable:true},
];

export default class DataTableWithInline extends LightningElement {
    @api recordId;
    columns=columns;
    data=[];
    saveDraftValue=[];

    @wire(getAccount)
    accountData(result){
        console.log("result:" +JSON.stringify(result))

        if(result.error){   //you must use result.data and result.error while using @wire
            this.data = undefined;
            console.log("error occured");
        }else if(result.data){
            this.data=result.data;  
            console.log("this.data:"+JSON.stringify(this.data))
        }
    }
    
    handleSave(event){
        const updatedField=event.detail.draftValues;    //updatedField variable has draft values now
        
        console.log("updatedField:"+JSON.stringify(updatedField)) 
        
        updateAccountDetails ({accountData: updatedField}) 
        .then(result =>{        
            console.log("apex result: "+JSON.stringify(result))
            
            this.dispatchEvent(          
                new ShowToastEvent({
                    title: result,
                    message: result,
                    variant: 'success'
                })
            );
        })
        .catch(error=>{       
        console.error("err: "+JSON.stringify(error))
        
    })
    }
}