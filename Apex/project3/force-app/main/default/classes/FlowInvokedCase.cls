public class FlowInvokedCase {
@InvocableMethod (label='Send Email to Contact' 
                      description='Send Email to Contact' 
                      category='Case') 
    public static void sendEmailToContact (List<Requests> requestList){
		String contactId = requestList.get(0).contactId;
		String caseNumber = requestList.get(0).caseNumber;
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage(); 
        message.toAddresses = new String[] { contactId };
        message.subject = 'Your Case has been received!'; 
        message.plaintextBody = 'Your Case has been received!'; 
        message.setSaveAsActivity(true);
        Messaging.SingleEmailMessage[] messages = new List<Messaging.SingleEmailMessage> {message}; 
        Messaging.SendEmailResult[] results = Messaging.sendEmail(messages); 
        if (results[0].success) {
            System.debug('The email was sent successfully.'); 
        } else {
            System.debug('The email failed to send: '+ results[0].errors[0].message);
        }
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
    public class Requests {
		@InvocableVariable(label='Record Id' description='The id of the case record' required=true) 
        public String caseId; 
        @InvocableVariable(label='Contact Record Id' description='The id of the contact record' required=true) 
        public String contactId; 
        @InvocableVariable(label='Case Number' description='The Case Number' required=true) 
        public String caseNumber;
    }
}