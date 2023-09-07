import Customer from '../models/customer.js';
import bcrypt from 'bcrypt';

export function signIn(req, res)
{
    return res.render('customer_SignIn',{
        title: 'Customer SignIn'
    });
}
export function signUp(req, res)
{
    return res.render('customer_SignUp',{
        title: 'Customer SignUp'
    });
}

// creating new customer
export async function createCustomer(req, res)
{
    try
    {
        // console.log(req.body);
        let customer = await Customer.findOne({email: req.body.email});

        if(!customer)
        {
            if(req.body.password !== req.body.confirm_password)
            {
                req.flash('error', 'Password and confirm password should be same');
                return res.redirect('back');
            }
            else
            {
                const saltRounds = 10; // Number of salt rounds for bcrypt hashing
                const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

                // Create a new customer with the hashed password
                let newCustomer = await Customer.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword, // Store the hashed password
                });
                
                req.flash('success', 'New Customer registered');
                return res.redirect('/customer/sign-in');
            }
        }
        else
        {
            // console.log('user is already registered');
            req.flash('error', 'This Customer is already registered');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error in creating customer :', err);
        return res.send('Internal Server Error');
    }
}

export function createSession(req, res)
{
    return res.redirect('/customer/dashboard');
}

export function customerDashboard(req, res)
{
    return res.send('Dashboard');
}