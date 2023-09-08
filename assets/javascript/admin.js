function toggleDashboards(selectedDashboard) 
{
    let approvedLoan = document.getElementById("approved-loan");
    let pendingLoan = document.getElementById("pending-loan");
    let paidLoan = document.getElementById("paid-loan");
    let rejectedLoan = document.getElementById("rejected-loan");

    if (selectedDashboard === 'approved-loan') 
    {
        approvedLoan.style.display = 'block';
        pendingLoan.style.display = 'none';
        paidLoan.style.display = 'none';
        rejectedLoan.style.display = 'none';
    } 
    else if (selectedDashboard === 'pending-loan') 
    {
        approvedLoan.style.display = 'none';
        pendingLoan.style.display = 'block';
        paidLoan.style.display = 'none';
        rejectedLoan.style.display = 'none';
    }
    else if (selectedDashboard === 'paid-loan') 
    {
        approvedLoan.style.display = 'none';
        pendingLoan.style.display = 'none';
        paidLoan.style.display = 'block';
        rejectedLoan.style.display = 'none';
    }
    else if (selectedDashboard === 'rejected-loan') 
    {
        approvedLoan.style.display = 'none';
        pendingLoan.style.display = 'none';
        paidLoan.style.display = 'none';
        rejectedLoan.style.display = 'block';
    }
}