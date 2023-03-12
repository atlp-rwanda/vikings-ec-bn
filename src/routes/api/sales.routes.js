import express from 'express';
import { SalesController } from '../../controllers/sales.controller';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { checkIfOrderExists } from '../../middlewares/order.middleware';
import { checkIfSaleExists } from '../../middlewares/sales.middleware';
import { uuidValidation } from '../../validations/user/userId.validation';


const salesRoutes = express.Router();

salesRoutes
.route('/')
.get(
    protectRoute,
    restrictTo('seller', 'admin'),
    SalesController.getSales
);

salesRoutes
    .route('/:saleId')
    .get(
        protectRoute,
        restrictTo('buyer', 'admin'),
        uuidValidation('saleId'),
        checkIfSaleExists,
        SalesController.getSale
    );

salesRoutes
    .route('/:orderId/orderSales')
    .get(
        protectRoute,
        restrictTo('buyer', 'admin'),
        uuidValidation('orderId'),
        checkIfOrderExists,
        SalesController.getOrderSales
    );
export default salesRoutes;