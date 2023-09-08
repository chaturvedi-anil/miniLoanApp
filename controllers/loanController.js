import Loan from '../models/loan.js';
import Customer from '../models/customer.js';

export async function loanDashboard(req, res)
{
    try 
    {
        if(req.params.id)
        {
            let approvedLoanList = await Loan.find({ customer: req.params.id, status: 'approved' });
            let allLoanList = await Loan.find({ customer: req.params.id});
            return res.render('loan_Dashboard',
            {
                title: "Loan Dashboad",
                approvedLoanList : approvedLoanList,
                allLoanList: allLoanList
            });
        }
        else
        {
            req.flash('error', "Please Sign In");
            return res.status(404).redirect('/customer/sign-in');
        }
    }
    catch(error)
    {
        console.log('Error in loan dashboard controller : ',error);
        return res.status(500).send("Internal Server Error");
    }
}

// apply for loan controller
export async function applyForLoan(req, res) 
{
    try 
    {
        if (req.params.id) 
        {
            // extracting current date
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();

            const loan = await Loan.create(
                {
                    ...req.body,
                    appliedDate: formattedDate // Set appliedDate to the current date (formatted as YYYY-MM-DD)
                }
            );

            if (loan) 
            {
                req.flash('success', "Loan Application Successfully Submitted");
                return res.redirect(`/customer/loans/dashboard/${req.params.id}`);
            } 
            else 
            {
                req.flash('error', "Error in submitting loan application");
                return res.redirect('back');
            }
        } 
        else 
        {
            req.flash('error', "Please Sign In");
            return res.status(404).redirect('/customer/sign-in');
        }
    } 
    catch (error) 
    {
        console.log('Error in apply loan dashboard controller : ', error);
        return res.status(500).send("Internal Server Error");
    }
}
