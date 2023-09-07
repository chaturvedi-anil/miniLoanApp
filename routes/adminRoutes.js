import { Router } from 'express';
import { signIn, signUp } from '../controllers/adminControllers.js';
const adminRouter = Router();

adminRouter.get('/sign-in', signIn);
adminRouter.get('/sign-up', signUp);

export default adminRouter;