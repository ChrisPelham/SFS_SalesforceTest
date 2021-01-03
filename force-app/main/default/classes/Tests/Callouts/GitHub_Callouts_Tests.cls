@isTest
public with sharing class GitHub_Callouts_Tests 
{
    @isTest static void test_getMasterSheet()
    {
        Test.setMock(HttpCalloutMock.class, new GitHub_Callouts_Mock());

        List<Object> response = GitHub_Callouts.getMasterSheet();

        System.assert(!response.isEmpty());

        String expectedBody = '[{"id":1,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2.00,"balance":1363.00}]';
        List<Object> expectedResponse = (List<Object>) JSON.deserializeUntyped(expectedBody);
        System.assertEquals(response, expectedResponse);
    }
}
