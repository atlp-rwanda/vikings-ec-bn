import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import {
	stripeCheckoutSession,
	stripeSuccess,
	stripeCancel,
	webHook,
} from '../../controllers/payment.controller';
import { getUserCart } from '../../middlewares/cart.middleware';
import {
	createEvent,
	createLineItems,
	getProductsDetails,
} from '../../middlewares/payment.middleware';

const paymentRoutes = express.Router();

paymentRoutes.post(
	'/create-checkout-session',
	protectRoute,
	restrictTo('buyer', 'admin'),
	getUserCart,
	getProductsDetails,
	createLineItems,
	stripeCheckoutSession
);

paymentRoutes.get('/success', stripeSuccess);
paymentRoutes.get('/cancel', stripeCancel);
paymentRoutes.post(
	'/webhook',
	express.raw({ type: 'application/json' }),
	createEvent,
	webHook
);
export default paymentRoutes;
