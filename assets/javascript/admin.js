function toggleDashboards(selectedDashboard) 
{
    let approvedLoan = document.getElementById("approved-loan");
    let pendingLoan = document.getElementById("pending-loan");

    if (selectedDashboard === 'approved-loan') 
    {
        approvedLoan.style.display = 'block';
        pendingLoan.style.display = 'none';
    } 
    else if (selectedDashboard === 'pending-loan') 
    {
        approvedLoan.style.display = 'none';
        pendingLoan.style.display = 'block';
    }
}