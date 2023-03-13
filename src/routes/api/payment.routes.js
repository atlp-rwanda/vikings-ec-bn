import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import {
	stripeCheckoutSession,
	stripeSuccess,
	stripeCancel,
} from '../../controllers/payment.controller';
import { checkCartNotEmpty, checkNoCartForPayment, getUserCart } from '../../middlewares/cart.middleware';
import {
	createLineItems,
	getProductsDetails,
} from '../../middlewares/payment.middleware';

const paymentRoutes = express.Router();

paymentRoutes.post(
	'/create-checkout-session',
	protectRoute,
	restrictTo('buyer', 'admin'),
	getUserCart,
	checkNoCartForPayment,
	checkCartNotEmpty,
	getProductsDetails,
	createLineItems,
	stripeCheckoutSession
);

paymentRoutes.get('/success', stripeSuccess);
paymentRoutes.get('/cancel', stripeCancel);
export default paymentRoutes;
