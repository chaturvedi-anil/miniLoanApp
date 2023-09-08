import Loan from '../models/loan.js';
import Customer from '../models/customer.js';
import Repayment from '../models/repayment.js';

export async function loanDashboard(req, res)
{
    try 
    {
        if(req.params.id)
        {
            let approvedLoanList = await Loan.find({ customer: req.params.id, status: 'approved' });
            let allLoanList = await Loan.find({ customer: req.params.id});
            return res.render('partials/customerPartials/customerLoanDashboard',
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

            const loanData = await Loan.create(
                {
                    ...req.body,
                    appliedDate: formattedDate // Set appliedDate to the current date (formatted as YYYY-MM-DD)
                }
            );

            if (loanData) 
            {
                // this query will push loan data in customer db
                await Customer.findByIdAndUpdate(
                    req.params.id,
                    {$push:{loans: loanData}},
                );
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



// admin access controller
// get all loans details controller function
export async function getAllLoansDetails(req, res) 
{
    try 
    {
        // Check if a user is present in req.user 
        if (req.user) 
        {
            // Find approved loans and populate customer names
            const approvedLoanList = await Loan.find({ status: 'APPROVED' })
                .populate('customer', 'name');

            // Find pending loans and populate customer names
            const pendingLoanList = await Loan.find({ status: 'PENDING' })
                .populate('customer', 'name');
                
            // Find paid loans and populate customer names
            const paidLoanList = await Loan.find({ status: 'PAID' })
                .populate('customer', 'name');

            // Find rejected loans and populate customer names
            const rejectedLoanList = await Loan.find({ status: 'REJECTED' })
                .populate('customer', 'name');

            // Render the loan dashboard page with the loan lists
            return res.render('partials/adminPartials/adminLoanDashboard', 
            {
                title: "Loan Dashboard",
                approvedLoanList,
                pendingLoanList,
                paidLoanList,
                rejectedLoanList
            });
        } 
        else 
        {
            // If no user , redirect to the admin sign-in page
            req.flash('error', "Please Sign In");
            return res.status(404).redirect('/admin/sign-in');
        }
    } 
    catch(error) 
    {
        // Handle any errors that occur during execution
        console.error('Error in loan dashboard controller:', error);
        return res.status(500).send("Internal Server Error");
    }
}
export async function approveLoan(req, res) {
    try {
        // Check if a user is authenticated
        if (req.user) {
            // Extract the current date
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();

            // Find the loan by ID and update its status to 'APPROVED'
            const updatedLoan = await Loan.findByIdAndUpdate(
                req.params.id, 
                { status: 'APPROVED' }, 
                { new: true }
            );

            // Check if the loan's status is updated correctly
            if (updatedLoan && updatedLoan.status === "APPROVED") {
                // Create a new repayment record based on the loan details
                const repayment = await Repayment.create({
                    loan: updatedLoan._id,
                    totalAmount: updatedLoan.amount,
                    remainingTerm: updatedLoan.term, // Use loan's term here
                    paymentDate: formattedDate
                });

                // Check if the repayment record is created successfully
                if (repayment) {
                    // Push the repayment data to the loan's repayments array
                    await Loan.findByIdAndUpdate(
                        req.params.id,
                        { $push: { repayments: repayment } },
                    );

                    // Flash a success message and redirect
                    req.flash('success', "Loan Application Approved");
                    return res.redirect('back');
                } else {
                    // Handle the case where the repayment record creation failed
                    req.flash('error', "Failed to create repayment record");
                    return res.redirect('back');
                }
            } else {
                // Handle the case where the loan status update failed
                req.flash('error', "Loan status not updated correctly");
                return res.redirect('back');
            }
        } else {
            // If no user is authenticated, redirect to the admin sign-in page
            req.flash('error', "Please Sign In");
            return res.status(404).redirect('/admin/sign-in');
        }
    } catch (error) {
        // Handle any errors that occur during execution
        console.error('Error in approveLoan controller:', error);
        req.flash('error', "Internal Server Error");
        return res.status(500).redirect('back');
    }
}
