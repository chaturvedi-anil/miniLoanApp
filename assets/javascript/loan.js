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
    else if (selectedDashboard === 'loan-dashboard') 
    {
        customerDashboard.style.display = 'none';
        loanDashboard.style.display = 'block';
    }
}
