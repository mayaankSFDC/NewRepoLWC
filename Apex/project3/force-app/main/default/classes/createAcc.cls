public class createAcc {
	@AuraEnabled
    public static Account createAccount(Account acc) {
        //system.debug('acc'+acc);
        //try {    
        insert acc;
              
    //} catch(DmlException e) {
    //System.debug('The following exception has occurred: ' + e.getMessage());
//}
    
    return acc;  
    }
}