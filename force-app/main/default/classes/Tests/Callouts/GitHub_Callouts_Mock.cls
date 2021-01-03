@isTest
global class GitHub_Callouts_Mock implements HttpCalloutMock
{
    global HTTPResponse respond(HTTPRequest request)
    {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('[{"id":1,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2.00,"balance":1363.00}]');
        response.setStatusCode(200);
        return response;
    }    
}
