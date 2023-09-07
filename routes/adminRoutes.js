import { Router } from 'express';
import { signIn, signUp, createAdmin } from '../controllers/adminControllers.js';
const adminRouter = Router();

adminRouter.get('/sign-in', signIn);
adminRouter.get('/sign-up', signUp);

adminRouter.post('/create', createAdmin);

export default adminRouter;