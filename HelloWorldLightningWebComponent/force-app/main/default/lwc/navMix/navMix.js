import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavMix extends NavigationMixin(LightningElement) {
    
    
        @api recordId;
    
        
    
       
        actionToCreateAccountNav() {
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Account',
                    actionName: 'new'
                },
            });
        }
        
       
        actionToAccountListViewNav() {
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Account',
                    actionName: 'list'
                },
                state: {
                    filterName: 'Recent'
                },
            });
        }
    
        
        actionToContactHomeNav() {
            this[NavigationMixin.Navigate]({
                "type": "standard__objectPage",
                "attributes": {
                    "objectApiName": "Contact",
                    "actionName": "home"
                }
            });
        }
    
        
        actionToFilesHomeNav() {
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'ContentDocument',
                    actionName: 'home'
                },
            });
        }
        
        
        actionToHomeNav() {
            this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'home'
                },
            });
        }
        
        
        actionToChatterNav() {
            this[NavigationMixin.Navigate]({
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'chatter'
                },
            });
        }
    
        
       
        actionToReportsNav() {
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Report',
                    actionName: 'home'
                },
            });
        }
       
        
        actionToWebNav() {
            this[NavigationMixin.Navigate]({
                "type": "standard__webPage",
                "attributes": {
                    "url": "https://www.w3web.net/"
                }
            });
        }
    
    
        actionToVFNav() {
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__webPage',
                attributes: {
                    url: '/apex/wrapperRelatedListVfp?id=' + this.recordId
                }
            }).then(generatedUrl => {
                window.open(generatedUrl);
            });
        }
        
        
    }