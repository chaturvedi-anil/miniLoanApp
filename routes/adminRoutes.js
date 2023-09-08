import { Router } from 'express';
import passport from 'passport';
import 
{ 
    signIn, 
    signUp, 
    createAdmin, 
    createSession, 
    adminDashboard, 
    destroySession,
    getAllLoansDetails
 } from '../controllers/adminControllers.js';
const adminRouter = Router();

adminRouter.get('/sign-in', signIn);
adminRouter.get('/sign-up', signUp);
adminRouter.get('/dashboard', adminDashboard);
adminRouter.get('/all-loans/:id', getAllLoansDetails);


adminRouter.post('/create', createAdmin);
adminRouter.post
(   
    '/create-session', 
    passport.authenticate('admin-local', 
    {
        failureRedirect: '/admin/sign-in',
        failureFlash: true,
    })
    ,createSession
);

adminRouter.get('/destroy-session', destroySession);
export default adminRouter;