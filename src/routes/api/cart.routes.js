import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { CartController } from '../../controllers/cart.controller';
import {
	addProductToCart,
	checkCartNotEmpty,
	checkProductInCart,
	getUserCart,
} from '../../middlewares/cart.middleware';
import cartValidation from '../../validations/cart/cart.validation';
import {
	checkProductAvailable,
	checkIfProductExistsById,
} from '../../middlewares/product.middleware';
import { uuidValidation } from '../../validations/user/userId.validation';

const cartRoutes = express.Router();
cartRoutes
	.route('/')
	.post(
		protectRoute,
		restrictTo('buyer', 'admin'),
		cartValidation,
		uuidValidation('productId'),
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
	)
	.put(
		protectRoute,
		restrictTo('buyer', 'admin'),
		getUserCart,
		checkCartNotEmpty,
		CartController.clearCart
	);

cartRoutes
	.route('/:productId')
	.patch(
		protectRoute,
		restrictTo('buyer', 'admin'),
		uuidValidation('productId'),
		checkIfProductExistsById,
		getUserCart,
		checkProductInCart,
		CartController.removeFromCart
	);
export default cartRoutes;
