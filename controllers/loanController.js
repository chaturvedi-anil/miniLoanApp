import Loan from '../models/loan.js';

export function loanDashboard(req, res)
{
    return res.render('loan_Dashboard', 
    {
        title: "Loan Dashboard"
    });
}