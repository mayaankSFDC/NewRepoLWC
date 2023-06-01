public class FlowInvokedClass {
	@InvocableMethod (label='Delete Related Opportunities' 
                      description='Delete Related Opportunities for the given Record Ids' 
                      category='Account') 
    public static void deleteOpportunities (List<String> ids) {
        // ids = {'001ythjhbhgs5'} 
        // Id accountId = ids.get(); 
        List<Opportunity> oppList = [Select Id FROM Opportunity Where AccountId =: ids AND StageName = 'Closed Won']; 
        delete opplist;
    }
    
    public static void sendEmail() {
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage(); 
        message.toAddresses = new String[] { '0037F0000155BKIQA3', '00Q7F000002A6LTUA0' };
        message.subject = 'Opt Out Test Message'; 
        message.plaintextBody = 'This is the message body.'; 
        message.setSaveAsActivity(true);
        Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message}; 
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages); 
        if (results[0].success) {
            System.debug('The email was sent successfully.'); 
        } else {
            System.debug('The email failed to send: '+ results[0].errors[0].message);
        }
    }
}