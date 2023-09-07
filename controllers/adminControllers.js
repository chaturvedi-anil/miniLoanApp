import Admin from '../models/admin.js';

export function signIn(req, res)
{
    return res.render('admin_SignIn',{
        title: 'Admin SignIn'
    });
}
export function signUp(req, res)
{
    return res.render('admin_SignUp',{
        title: 'Admin SignUp'
    });
}

// creating new users
export async function createAdmin(req, res)
{
    try
    {
        // console.log(req.body);
        let admin = await Admin.findOne({email: req.body.email});

        if(!admin)
        {
            if(req.body.password !== req.body.confirm_password)
            {
                req.flash('error', 'Password and confirm password should be same');
                return res.redirect('back');
            }
            else
            {
                let newAdmin = await Admin.create(req.body);
                
                req.flash('success', 'New Admin registered');
                return res.redirect('/admin/sign-in');
            }
        }
        else
        {
            // console.log('user is already registered');
            req.flash('error', 'This Admin is already registered');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        console.log('Error in creating admin :', err);
        return res.send('Internal Server Error');
    }
}