
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