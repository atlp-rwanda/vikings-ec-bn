import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { CartController } from '../../controllers/cart.controller';
import {
	addProductToCart,
	getUserCart,
} from '../../middlewares/cart.middleware';
import cartValidation from '../../validations/cart/cart.validation';
import { checkProductAvailable } from '../../middlewares/product.middleware';

const cartRoutes = express.Router();
cartRoutes
	.route('/')
	.post(
		protectRoute,
		restrictTo('buyer', 'admin'),
		cartValidation,
		checkProductAvailable,
		getUserCart,
		addProductToCart,
		CartController.addToCart
	)
	.get(
		protectRoute,
		restrictTo('buyer', 'admin'),
		getUserCart,
		CartController.viewCart
	);
export default cartRoutes;
