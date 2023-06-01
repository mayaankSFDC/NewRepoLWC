// Here, we have declared sectionName, enableIncrment as the public property 
// with @api annotation that means we will send the value for these properties from 
// other component named “callIncremental”. As Reactive Properties rule, if the values 
// are changed to the properties, the component will be rerendered automatically.
// We have defined incrementValue property with @track decoration to calculate 
// the incremental value which will be visible in the screen by clicking  [+] button.

// Notes
// Remember, you can not set the public property(@api) in the current component’s js file. 
// Remember, you can only set the value of a public property during component construction 
// time means you can only send the value for public property.

// For example, If we will set the public property named “sectionName” in our “incrmental” 
// component,  we will not get this section name in the output.

import { LightningElement, api, track } from 'lwc';
 
export default class Incremental extends LightningElement {
    @api sectionName;
    @api enableIncrement;
    @track incrementValue = 1;
    incrementBy = 1;
 
    increment(){
        this.incrementValue = this.incrementValue + this.incrementBy;
    }

    itsname(){
        this.name
    }
 
}