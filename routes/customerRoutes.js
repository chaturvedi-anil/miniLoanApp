import { Router } from 'express';
import { signIn, signUp } from '../controllers/customerController.js';
const customerRouter = Router();

customerRouter.get('/sign-in', signIn);
customerRouter.get('/sign-up', signUp);

export default customerRouter;