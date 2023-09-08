import { Router } from 'express';
import passport from 'passport';
import loanRoutes from './loanRoutes.js';
import { signIn, signUp, createCustomer, createSession, customerDashboard,destroySession } from '../controllers/customerController.js';
const customerRouter = Router();

const checkAuthentication = (req, res)=>{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/customer/sign-in');
}

customerRouter.get('/sign-in', signIn);
customerRouter.get('/sign-up', signUp);
customerRouter.get('/dashboard', checkAuthentication,customerDashboard);

customerRouter.post('/create', createCustomer);
customerRouter.post
(   
    '/create-session', 
    passport.authenticate('customer-local', 
    {
        failureRedirect: '/customer/sign-in',
        failureFlash: true,
    })
    ,createSession
);

customerRouter.get('/destroy-session', destroySession);

customerRouter.use('/loans',checkAuthentication ,loanRoutes);
export default customerRouter;