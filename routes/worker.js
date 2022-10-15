import express from 'express';
import { index, create } from '../controllers/workers_controller.js';

const workerRouter = express.Router();

workerRouter.get('/', index);

workerRouter.post('/', create);


export default workerRouter;