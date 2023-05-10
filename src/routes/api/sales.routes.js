import express from 'express';
import { SalesController } from '../../controllers/sales.controller';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import {checkIfOrderExists, receivedPaginationFormat} from '../../middlewares/order.middleware';
import { checkIfSellerOwnsProduct } from '../../middlewares/product.middleware';
import { checkIfSaleExists } from '../../middlewares/sales.middleware';
import statusValidation from '../../validations/sale/status.validation';
import { uuidValidation } from '../../validations/user/userId.validation';
import validatePagination from '../../validations/order/order.validation';

const salesRoutes = express.Router();

salesRoutes
  .route('/')
  .get(protectRoute, restrictTo('seller', 'admin'), SalesController.getSales);

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
    validatePagination,
    receivedPaginationFormat,
    uuidValidation('orderId'),
    checkIfOrderExists,
    SalesController.getOrderSales
  );
salesRoutes.patch(
  '/:saleId/status',
  protectRoute,
  restrictTo('seller','admin'),
  uuidValidation('saleId'),
  statusValidation,
  checkIfSaleExists,
  checkIfSellerOwnsProduct,
  SalesController.updateSaleStatus
);
export default salesRoutes;
