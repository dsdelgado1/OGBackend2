import express from 'express';
import { index } from '../controllers/worker_customers_controller.js';

const workerCustomersRouter = express.Router();

workerCustomersRouter.get('/', index);



export default workerCustomersRouter;