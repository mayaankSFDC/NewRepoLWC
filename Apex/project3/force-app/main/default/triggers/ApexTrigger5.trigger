trigger ApexTrigger5 on Account (before update) {
//Using map to reduce code lines
//here we are taking example of befoe trigger to update mailing city of contact from account
    Map<Id,Account> nMap=new Map<Id,Account>();
nMap= trigger.newMap;
List<Contact> cList=[Select AccountId, LastName, MailingCity from Contact where AccountId in :nMap.keySet()];
for(Contact c:cList){
	Account a=nMap.get(c.AccountId);
	c.MailingCity=a.BillingState;
}
update cList;
}
/* List<Account> nList=new List<Account>();
nList= trigger.new;
List<Contact> cList=[Select LastName, AccountId from Contact where AccountId in :nList];
for(Contact c:cList){
	Account a=c.AccountId;
	c.MailingCity=a.BillingState;
}
update cList;
} */
