public with sharing class GitHub_Callouts 
{
    @AuraEnabled (cacheable = true)
    public static List<Object> getMasterSheet()
    {
        List<Object> masterList = new List<Object>();
        String fileURL = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';

        try
        {
            HttpRequest request = new HttpRequest();
            request.setEndpoint(fileURL);
            request.setMethod('GET');
            request.setHeader('Content-Type', 'application/json');
            request.setTimeout(60000);

            Http http = new Http();
            HttpResponse response = http.send(request);

            if (response.getStatusCode() == 200) 
            {
                String responseBody = response.getBody();
                masterList = (List<Object>) JSON.deserializeUntyped(responseBody);
            }
        }
        catch (exception ex)
        {
            system.debug('getMasterSheet() encountered an exception, Cause: ' + ex.getCause() + ', Message: ' + ex.getMessage());
        }
        
        return masterList;
    }
}
