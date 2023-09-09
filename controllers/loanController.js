import Loan from '../models/loan.js';
import Customer from '../models/customer.js';
import Payment from '../models/payment.js';

export async function loanDashboard(req, res)
{
    try 
    {
        if(req.params.id)
        {
            let approvedLoanList = await Loan.find({ customer: req.params.id, status: 'APPROVED' });
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


function getDate()
{
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const parsedDate = new Date(formattedDate);
    const next7thDate = new Date(parsedDate);
    next7thDate.setDate(parsedDate.getDate() + 7);

    // Extract only the date part as a string
    const next7thDateString = next7thDate.toISOString().split('T')[0];

    return next7thDateString;
}

export async function approveLoan(req, res) 
{
    try {
        // Check if a user is authenticated
        if (req.user) 
        {
            const nextPaymentDate = getDate();

            // Find the loan by ID and update its status to 'APPROVED'
            const updatedLoan = await Loan.findByIdAndUpdate(
                req.params.id, 
                { status: 'APPROVED' }, 
                { new: true }
            );

            // Check if the loan's status is updated correctly
            if (updatedLoan && updatedLoan.status === "APPROVED") {
                // Create a new Payment record based on the loan details
                const payment = await Payment.create({
                    loan: updatedLoan._id,
                    totalAmount: updatedLoan.amount,
                    remaningAmount: updatedLoan.amount,
                    totalTearm: updatedLoan.term,
                    remaningTerm: updatedLoan.term, // Use loan's term here
                    completedTerm: 0,
                    paymentDate:nextPaymentDate
                });

                // Check if the Payment record is created successfully
                if (payment) 
                {
                    // Push the Payment data to the loan's Payment array
                    await Loan.findByIdAndUpdate(
                        req.params.id,
                        { $push: { payments: payment } },
                    );

                    // Flash a success message and redirect
                    req.flash('success', "Loan Application Approved");
                    return res.redirect('back');
                } 
                else 
                {
                    // Handle the case where the Payment record creation failed
                    req.flash('error', "Failed to create Payment record");
                    return res.redirect('back');
                }
            } 
            else 
            {
                // Handle the case where the loan status update failed
                req.flash('error', "Loan status not updated correctly");
                return res.redirect('back');
            }
        } 
        else 
        {
            // If no user is authenticated, redirect to the admin sign-in page
            req.flash('error', "Please Sign In");
            return res.status(404).redirect('/admin/sign-in');
        }
    } 
    catch (error) 
    {
        // Handle any errors that occur during execution
        console.error('Error in approveLoan controller:', error);
        req.flash('error', "Internal Server Error");
        return res.status(500).redirect('back');
    }
}

export async function rejectLoanApplication(req, res)
{
    try 
    {
        // Check if a user is authenticated
        if (req.user) 
        {
            // Find the loan by ID and update its status to 'REJECT'
            const updatedLoanStatus = await Loan.findByIdAndUpdate(
                req.params.id, 
                { status: 'REJECTED' }, 
                { new: true }
            );

            if(updatedLoanStatus)
            {
                req.flash('success', "Loan Application Rejected");
                return res.redirect('back');
            }
            else 
            {
                // Handle the case where the loan status update failed
                req.flash('error', "Loan status not updated correctly");
                return res.redirect('back');
            }
        } 
        else 
        {
            // If no user is authenticated, redirect to the admin sign-in page
            req.flash('error', "Please Sign In");
            return res.status(404).redirect('/admin/sign-in');
        }
    } 
    catch (error) 
    {
        // Handle any errors that occur during execution
        console.error('Error in approveLoan controller:', error);
        req.flash('error', "Internal Server Error");
        return res.status(500).redirect('back');
    }
}