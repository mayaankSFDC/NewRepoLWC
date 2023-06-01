import { LightningElement , track} from 'lwc';
import getOppty from '@salesforce/apex/comboboxDemoClass.getOppty';

export default class testDropdown extends LightningElement {
@track value = ''; 
@track oppOption =[];

get options(){
return this.oppOption;
}

/* ******WRITING: CODE TO FETCH VALUES IN PICKLIST  :****** */
connectedCallback() {
getOppty() 
.then(result => { 
    let arr = []; 
    for(var i=0; i<result.length;i++ ) {
        arr.push({ label :result[i].Name, value : result[i].Id })
    }
    this.oppOption = arr;

})
}
/* ******WRITING: THE FOLLOWING CODE TO SYNC HTML ELEMENT VALUE TO VALUE VARIABLE  :****** */
handleChanged(event){
    this.value=event.detail.value;
}
}