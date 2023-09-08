import { Router } from 'express';
import passport from 'passport';
import { loanDashboard } from '../controllers/loanController.js';

const loanRouter = Router();

loanRouter.get('/dashboard/:id', loanDashboard);

export default loanRouter;