public class AccountUtility {
public static void viewAnnualRevenue(){
List<Account> accountsList=[SELECT Id, Name, AnnualRevenue FROM Account];
for(account acct:accountsList){
String acctRev=acct.Name+':'+acct.AnnualRevenue;
System.debug('acctRev' +acctRev);
}
}
}