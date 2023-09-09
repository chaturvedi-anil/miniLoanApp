import { Router } from "express";
import { loanPayment} from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.get('/loan-payment/:id', loanPayment);


export default paymentRouter;