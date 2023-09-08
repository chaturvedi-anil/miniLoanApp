import { Router } from 'express';
import { applyForLoan, loanDashboard} from '../controllers/loanController.js';

const loanRouter = Router();

loanRouter.get('/dashboard/:id', loanDashboard);
loanRouter.post('/loanApplication/:id', applyForLoan);

export default loanRouter;