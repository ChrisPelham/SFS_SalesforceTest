<a name="top-menu"></a>

# Chris Pelham Salesforce Test Submission

Create a table that displays creditor data, retrieved from a url, with selectable rows. Display a running total of all rows, selected rows and sum of the balance of all selected rows. Display an 'Add Debt' button, to add additional creditor rows to the table, and a 'Remove Debt' button which removes creditor rows from the table.

## Solution

* Create an Apex callout method which GETs the creditor data, in JSON format, from a URL. 
* Develop a lightning web component, that on load, calls the Apex method and displays the response in a lightning datatable with selectable rows.
* Insert 'Add Debt' and 'Remove Debt' lightning buttons below the table.
    * When the Add Debt button is clicked, display a modal with input fields to add new new creditor data, along with a Save and Cancel button
        * When Save button is clicked, add row to the bottom of the creditor table that displays input data and close modal.
        * When Cancel button is clicked, close Modal.
    * When the Remove Debt button is clicked, remove all selected rows from the creditor table.
* Display totals for selected debt, row count and selected row count below the buttons.
    * Totals should be updated automatically when changes are made to the table.

## Classes Created

### Callouts Class
The GitHub_Callouts class contains one method, getMasterSheet(). This method makes a GET request to https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json, retrieving a JSON body. The method then converts the JSON to a List of Objects and returns them.

* [classes/Callouts/GitHub_Callouts.cls](/force-app/main/default/classes/Callouts/GitHub_Callouts.cls)

### Test Classes
The following test class implements the HttpCalloutMock interface to test the getMasterSheet() apex method. It ensures that the expected response matches the actual response returned from the Mock response.

* [classes/Tests/Callouts/GitHub_Callouts_Mock.cls](/force-app/main/default/classes/Tests/Callouts/GitHub_Callouts_Mock.cls) 
* [classes/Tests/Callouts/GitHub_Callouts_Tests.cls](/force-app/main/default/classes/Tests/Callouts/GitHub_Callouts_Tests.cls)

## Lightning Web Components

### Creditor Table Component
The Creditor Table component displays a lightning datatable with selectable rows, buttons to Add and Remove rows from the table, as well as running totals of the sum of selected creditor balances, selected rows as well as total rows.  

Data displayed in the datatable is retrieved by calling the getMasterSheet() method in GitHub_Callouts.cls. Event Handlers have been created to add new creditors to the table, via an input form displayed in a modal, as well to remove selected creditors from the table.

The built in 'onrowselection' event handler of the datatable is utilized to store selected row data and update the running totals displayed at the bottom of the page.

* [lwc/creditorTable/creditorTable.css](/force-app/main/default/lwc/creditorTable/creditorTable.css)
* [lwc/creditorTable/creditorTable.html](/force-app/main/default/lwc/creditorTable/creditorTable.html)
* [lwc/creditorTable/creditorTable.js](/force-app/main/default/lwc/creditorTable/creditorTable.js)

[Back to Top](#top-menu)
