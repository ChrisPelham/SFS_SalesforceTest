import { LightningElement } from 'lwc';
import getMasterSheet from '@salesforce/apex/GitHub_Callouts.getMasterSheet';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label : 'Creditor', fieldName : 'creditorName' },
    { label : 'First Name', fieldName : 'firstName' },
    { label : 'Last Name', fieldName : 'lastName' },
    { label : 'Min Pay%', fieldName : 'minPaymentPercentage',  type : 'number', typeAttributes : { minimumFractionDigits : '2'}},
    { label : 'Balance', fieldName : 'balance', type : 'currency'}
];

const ERROR_TITLE = 'An error occurred attempting to retrieve the data.';
const ERROR_VARIANT = 'error';

export default class CreditorTable extends LightningElement 
{
    data = [];
    selectedRows = [];
    columns = columns;
    isLoading = false;

    totalBalance = 0.00;
    checkedRows = 0;
    totalRows = 0;

    addDebt = false;
    creditor;
    firstName;
    lastName;
    minPayment;
    balance;

    // Calls Apex method to return results from callout
    // If data exists, update table with data
    // Get number of rows returned and display total
    // If an error is encountered, display an error message
    connectedCallback()
    {
        this.isLoading = true;

        getMasterSheet()
        .then(data => 
            {
                this.data = data;
                this.totalRows = data.length;

                this.isLoading = false;
        })
        .catch(error => 
            {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: ERROR_TITLE,
                        message: error.message.body,
                        variant: ERROR_VARIANT,
                    })
                );

                this.isLoading = false;
        });
    }

    // Displays Add Debt Modal
    addCreditor()
    {
        this.addDebt = true;
    }

    // Close Add Debt Modal
    closeModal()
    {
        this.addDebt = false;
    }

    // Input Event Handlers
    // Stores input in variables
    handleBalanceChange(event)
    {
        this.balance = event.target.value;
    }

    handleCreditorChange(event)
    {
        this.creditor = event.target.value;
    }

    handleFirstNameChange(event)
    {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event)
    {
        this.lastName = event.target.value;
    }

    handleMinPaymentChange(event)
    {
        this.minPayment = event.target.value;
    }

    // Removes selected rows from the existing data set
    // Filters out items contained in the selected rows data set from the existing data set
    removeCreditors()
    {
        this.isLoading = true;

        const existingData = this.data;
        const selectedRows = this.selectedRows;

        const filteredData = existingData.filter(function(row) 
        {
            return !selectedRows.includes(row); 
        });

        this.data = filteredData;
        this.totalRows = filteredData.length;
        this.checkedRows = 0;

        this.isLoading = false;
    }

    // Validates User Input
    // Creates a copy of data in table
    // Creates new collection with data from user input
    // Sets Id of new row to one greater than the last id in the collection
    // Contacts copy of data with new collection and saves to datatable
    // Updates row total
    saveCreditor()
    {
        this.isLoading = true;
        this.validateInput();

        if (this.isValid)
        {        
            let existingData = this.data;
            const newData = [
                {
                id : existingData[existingData.length -1].id + 1,
                creditorName : this.creditor,
                firstName : this.firstName,
                lastName : this.lastName,
                minPaymentPercentage : this.minPayment,
                balance : this.balance
                }
            ];
            this.data = existingData.concat(newData);
            this.totalRows = this.data.length;

            this.addDebt = false;
        }

        this.isLoading = false;
    }

    // Parses event details to determine how many rows are checked and displays the total
    // Keeps a running sum of the balances of all checked rows and displays the total
    // Stores selected row data in a variable
    updateCheckedTotals(event)
    {
        const selectedRows = event.detail.selectedRows;
        let totalRunningBalance = 0;

        selectedRows.forEach(row =>
        {
            totalRunningBalance += row.balance;
        });        

        this.selectedRows = selectedRows;
        this.checkedRows = selectedRows.length;
        this.totalBalance = totalRunningBalance;
    }

    // Input Validation Methods
    validateInput()
    {
        this.isValid = true;

        this.template.querySelectorAll('lightning-input').forEach(element => { 
            element.reportValidity();
            if (element.reportValidity() === false){
                this.isValid = false;
            }
        }) ;
    }
}