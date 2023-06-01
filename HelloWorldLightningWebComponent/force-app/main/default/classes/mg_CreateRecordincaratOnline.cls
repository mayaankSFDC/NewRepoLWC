public class mg_CreateRecordincaratOnline {
    
    public static void projectCreationAutomatically(Set<id> opIdProjSet){
        List<Project__c> newProjects = new List<Project__c>();
        List<Opportunity> oppList = [Select ID, Name, AccountId,Description 
                                         FROM Opportunity];
        
        if(oppList.size()>0){
            for(Opportunity op : oppList){
                Project__c prj=new Project__c();
                prj.Account__c=op.AccountId;
                prj.Project_Name__c=op.Name;
                prj.Opportunity__c = op.Id;
                prj.Description__c=op.Description;
                prj.Project_Status__c='Not Started';
                prj.Pipeline__c = 'Projects';
                newProjects.add(prj);
            }
        }
        
        if(!newProjects.isEmpty()) {
            system.debug('newProjects----'+newProjects);
            insert newProjects;
        }
    }        
    @future(callout=true)
    public static void syncContactwithCaratOnline(Set<id> oppIdSet){
        
        if(oppIdSet != null){
            List<Opportunity> oppList = [Select ID, Name, AccountId 
                                         FROM Opportunity];
            
            Set<Id> accIdSet = new Set<Id>();
            if(oppList != null){
                for(Opportunity opp: oppList){
                    accIdSet.add(opp.AccountId);
                }
            }
            
            if(accIdSet != null){
                List<Account> accList = [Select Id,Name, FirstName, LastName, BillingStreet,
                                BillingCity, BillingState, BillingCountry,
                                PersonEmail,Phone 
                                FROM Account where IsPersonAccount = true];
                
                List<contactWrapper> cwList =new List<contactWrapper>();
                
                if(accList!= null){
                    for(Account ac : accList){
                        contactWrapper cw =new contactWrapper();
                        cw.Id = ac.Id;
                        cw.Name = ac.Name;
                        cw.Phone = ac.Phone;
                        if(ac.BillingStreet !=null){
                            cw.Address = ac.BillingStreet;
                        }
                        if(ac.BillingCity !=null){
                            cw.Address = cw.Address+'-'+ac.BillingStreet;
                        }
                        if(ac.BillingState !=null){
                            cw.Address = cw.Address+'-'+ac.BillingState;
                        }
                        if(ac.BillingCountry !=null){
                            cw.Address = cw.Address+'-'+ac.BillingCountry;
                        }
                        cw.ContactFirstName = ac.FirstName;
                        cw.ContactLastName = ac.LastName;
                        cw.ContactEmail = ac.PersonEmail;
                        cw.ContactPhone = ac.Phone;
                        cw.Active = 'true';
                        
                        String JSONBody = JSON.serialize(cw);
                        
                        string username =  'api';  
                        string password =  '7B9D6D86C1';
                        
                        //String str = '{"Id":"TEST","Name":"test comnpany", "Phone":"00999999", "Address":"asasasasa asasasa ssa", "ContactFirstName":"ran","ContactLastName":"zask","ContactEmail":"ranzask@ddd.com","ContactPhone":"0912313132","Active":true}';
 
                         Map<String,Object> rawObj ;
                         String endPoint = 'https://madlytest.carats.online/en-SG/Api/ExternalAPI/CreateOrUpdateCustomer';
                                                     
                        system.debug('endPoint----'+endPoint);
                        Http http = new Http();
                        HttpRequest req = new HttpRequest();
                        req.SetEndPoint(endPoint);
                        Blob headerValue = Blob.valueOf(username +':'+ password);
                        String authorizationHeader = 'Basic '+EncodingUtil.base64Encode(headerValue);
                        req.setHeader('Authorization', authorizationHeader);
                        req.setMethod('POST');
                        req.setHeader('content-type', 'application/json');
                        req.setBody(JSONBody);
                        req.setTimeout(120000); 
                        HTTPResponse res = http.send(req);
                        system.debug('res----'+res.getBody());
                        
                        rawObj = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
                    }
                }
            }
        }
    }
    
    @future(callout=true)
    public static void syncProductInfowithCaratOnline(Set<id> oppIdSet){
        if(oppIdSet != null){
            
            List<Product__c> piList = [Select Id,Name, CO_Invoice_ID__c, Invoice_Status__c, Parcel_Type__c,
                                        Opportunity__c, Opportunity__r.AccountId, Opportunity__r.Account.Name,
                                        Opportunity__r.User_Responsible__c,Opportunity__r.User_Responsible__r.Name,
                                        Opportunity__r.Description,Quantity__c,SKU__c,Stone_Type__c,Total_Price__c,Weight__c 
                                        FROM Product__c where Opportunity__c IN:oppIdSet];
            
            List<purchaseInfoWrapper> pwList =new List<purchaseInfoWrapper>();
            
            if(piList!= null){
                for(Product__c pi : piList){
                    purchaseInfoWrapper pw =new purchaseInfoWrapper();
                    
                    pw.CustomerExternalId  = pi.Opportunity__r.AccountId;
                        pw.SKU = String.ValueOf(pi.SKU__c);
                        pw.Weight = String.ValueOf(pi.Weight__c);
                        pw.Quantity = String.ValueOf(pi.Quantity__c);
                        pw.Note = pi.Opportunity__r.Description;
                        pw.TotalPrice = String.ValueOf(pi.Total_Price__c);
                        pw.SalesPerson = pi.Opportunity__r.User_Responsible__r.Name;
                        pw.InvoiceName = '';
                        
                    
                    String JSONBody = JSON.serialize(pw);
                    
                    string username =  'api';  
                    string password =  '7B9D6D86C1';
                    
                    
                    Map<String,Object> rawObj ;
                    String endPoint = 'https://madlytest.carats.online/en-SG/Api/ExternalAPI/CreateInvoice';
                    
                    system.debug('endPoint----'+endPoint);
                    Http http = new Http();
                    HttpRequest req = new HttpRequest();
                    req.SetEndPoint(endPoint);
                    Blob headerValue = Blob.valueOf(username +':'+ password);
                    String authorizationHeader = 'Basic '+EncodingUtil.base64Encode(headerValue);
                    req.setHeader('Authorization', authorizationHeader);
                    req.setMethod('POST');
                    req.setHeader('content-type', 'application/json');
                    req.setBody(JSONBody);
                    req.setTimeout(120000); 
                    HTTPResponse res = http.send(req);
                    system.debug('res----'+res.getBody());
                    
                    rawObj = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
                    
                }
            }
        }
    }
    
    @future(callout=true)
    public static void syncProductDeletionwithCaratOnline(Set<id> pIdSet){
        List<Product__c> piList = [Select Id,Name, CO_Invoice_ID__c, Invoice_Status__c, Parcel_Type__c,
                                        Quantity__c,SKU__c,Stone_Type__c,Total_Price__c,Weight__c 
                                        FROM Product__c where Id IN:pIdSet];
            
            List<prductInvoiceWrapper> pwList =new List<prductInvoiceWrapper>();
            
            if(piList!= null){
                for(Product__c pi : piList){
                    prductInvoiceWrapper pw =new prductInvoiceWrapper();
                     pw.InvoiceId = String.ValueOf(pi.CO_Invoice_ID__c);
                                          
                    
                    String JSONBody = JSON.serialize(pw);
                    
                    string username =  'api';  
                    string password =  '7B9D6D86C1';
                    
                    
                    Map<String,Object> rawObj ;
                    String endPoint = 'https://madlytest.carats.online/en-SG/Api/ExternalAPI/DeleteInvoice';
                    
                    system.debug('endPoint----'+endPoint);
                    Http http = new Http();
                    HttpRequest req = new HttpRequest();
                    req.SetEndPoint(endPoint);
                    Blob headerValue = Blob.valueOf(username +':'+ password);
                    String authorizationHeader = 'Basic '+EncodingUtil.base64Encode(headerValue);
                    req.setHeader('Authorization', authorizationHeader);
                    req.setMethod('POST');
                    req.setHeader('content-type', 'application/json');
                    req.setBody(JSONBody);
                    req.setTimeout(120000); 
                    HTTPResponse res = http.send(req);
                    system.debug('res----'+res.getBody());
                    
                    rawObj = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
                    
                }
            
        }
    }
    
    public class prductInvoiceWrapper{
        public String InvoiceId; //ebde5bbb-1282-ed11-a1f8-9c5c8e7086b9
    }
    public class purchaseInfoWrapper{
        public String CustomerExternalId;   //test
        public String SKU;  //1233
        public String Weight;   //1
        public String Quantity; //1
        public String Note; //ran test
        public String TotalPrice;   //15532.90
        public String SalesPerson;  //ranzask
        public String InvoiceName;  //Inv Name
    }
    public class contactWrapper{
        public String Id;
        public String Name;
        public String Phone;
        public String Address;
        public String ContactFirstName;
        public String ContactLastName;
        public String ContactEmail;
        public String ContactPhone;
        public String Active;
    }
}

