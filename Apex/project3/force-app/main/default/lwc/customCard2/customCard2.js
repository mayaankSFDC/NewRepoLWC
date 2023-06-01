import { LightningElement } from 'lwc';

export default class CustomCard2 extends LightningElement {
    newTag1=1
    newTag2=2
    newTag3=3    
    newSection="Hello World"
    changeHandler1(event){
        this.newSection=event.target.value
    }
    changeHandler2(event){
        this.newTag1=event.target.value
    }
    changeHandler3(event){
        this.newTag2=event.target.value
    }
    changeHandler4(event){
        this.newTag3=event.target.value
    }
}