import express from 'express';
import { index, create, update, destroy } from '../controllers/customers_controller.js';

const customerRouter = express.Router();

customerRouter.get('/', index);

customerRouter.post('/', create);

customerRouter.post('/update', update);

customerRouter.post('/destroy',destroy);

// customerRouter.post('/id', update); //Need to figure out how to do routes of individual ids

// router.post('/add-product', (req, res, next) => {
//     console.log(req.body.title);
//     res.redirect('/');
// });

export default customerRouter;