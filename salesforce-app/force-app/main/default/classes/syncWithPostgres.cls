public class syncWithPostgres {

    @AuraEnabled
    public static String syncToPostgres(String recordId) {
        System.debug('syncToPostgres CALLED with recordId=' + recordId);

        try {
            Veterinarian__c vet = [
                SELECT Id, Name, Veterinarian_ID__c, Phone__c, Email__c, Clinic_Name__c
                FROM Veterinarian__c
                WHERE Id = :recordId
                LIMIT 1
            ];
            System.debug('Vet record ' + vet);
            makeCallout(
                vet.Name,
                vet.Veterinarian_ID__c,
                vet.Phone__c,
                vet.Email__c,
                vet.Clinic_Name__c
            );
        
            return 'Sync initiated successfully';
        } catch (Exception e) {
            System.debug('ERROR: ' + e.getMessage());
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }

    @future(callout=true)
    public static void makeCallout(
        String name,
        String vetid,
        String phone,
        String email,
        String clinicname
    ) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();

        request.setEndpoint('https://sfdxassignment-production.up.railway.app/api/sync/veterinarian');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setTimeout(20000);

        Map<String, Object> payload = new Map<String, Object>();
        payload.put('Veterinarian_Id__c', vetid);
        payload.put('Name', name);
        payload.put('Email__c', email);
        payload.put('Phone__c', phone);
        payload.put('Clinic_Name__c', clinicname);


        request.setBody(JSON.serialize(payload));

        HttpResponse response = http.send(request);

        System.debug('Status Code: ' + response.getStatusCode());
        System.debug('Response Body: ' + response.getBody());
    }

}