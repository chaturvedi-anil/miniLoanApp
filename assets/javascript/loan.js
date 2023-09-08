function toggleLoanApplication() 
{
    let loanFormContainer = document.getElementById("loan-form-container");
    
    if (loanFormContainer.style.display === "none" || loanFormContainer.style.display === "") {
        loanFormContainer.style.display = "block";
    } else {
        loanFormContainer.style.display = "none";
    }
}

function closeLoanApplication() {
    let loanFormContainer = document.getElementById("loan-form-container");
    loanFormContainer.style.display = "none";
}

// JavaScript for loan.js
function toggleDashboards(selectedDashboard) 
{
    let customerDashboard = document.getElementById("customer-dashboard");
    let loanDashboard = document.getElementById("loan-dashboard");

    if (selectedDashboard === 'customer-dashboard') 
    {
        customerDashboard.style.display = 'block';
        loanDashboard.style.display = 'none';
    } 
    else if (selectedDashboard === 'loan-dashboard') {
        customerDashboard.style.display = 'none';
        loanDashboard.style.display = 'block';
    }
}
// function showCustomerDashboard() 
// {
//     let customerDashboard = document.getElementById("customer-dashboard");
//     console.log("ouside if ",customerDashboard);
//     if (customerDashboard.style.display === 'none' || customerDashboard.style.display === '') 
//     {
//         customerDashboard.style.display = 'block';
//         console.log("inside if ",customerDashboard);
//     } 
//     else 
//     {
//         customerDashboard.style.display = 'none';
//         console.log("inside else ",customerDashboard);
//     }
// }

// function showLoanHistory() 
// {
//     console.log('clicked');
//     let loanDashboard = document.getElementById("loan-dashboard");
//     console.log("outside if ",loanDashboard);
//     if (loanDashboard.style.display === 'none' || loanDashboard.style.display === '') 
//     {
//         loanDashboard.style.display = 'block';
//         console.log("inside if ",loanDashboard);
//     } 
//     else 
//     {
//         loanDashboard.style.display = 'none';
//         console.log("inside else ",loanDashboard);
//     }
// }