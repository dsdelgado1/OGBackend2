import express from 'express';
import workerRouter from './routes/worker.js';
import customerRouter from './routes/customer.js';
import workerCustomerRouter from './routes/workercustomer.js';
import cors from 'cors';

// import db from './util/database.js'

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use('/workers', workerRouter);
app.use('/customers', customerRouter);
app.use('/workerCustomers', workerCustomerRouter);


app.listen(3001);