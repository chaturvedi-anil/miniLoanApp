
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