import express from 'express';
import { protectRoute, restrictTo } from '../../middlewares/auth.middleware';
import { CartController } from '../../controllers/cart.controller';
import {
	addProductToCart,
	checkProductInCart,
	getUserCart,
} from '../../middlewares/cart.middleware';
import cartValidation from '../../validations/cart/cart.validation';
import { checkProductAvailable } from '../../middlewares/product.middleware';

const cartRoutes = express.Router();
cartRoutes.post(
	'/add-to-cart',
	protectRoute,
	restrictTo('buyer', 'admin'),
	cartValidation,
	checkProductAvailable,
	getUserCart,
	addProductToCart,
	CartController.addToCart
);

cartRoutes.get(
	'/view-cart',
	protectRoute,
	restrictTo('buyer', 'admin'),
	getUserCart,
	CartController.viewCart
);

cartRoutes.post(
	'/clear-cart',
	protectRoute,
	restrictTo('buyer', 'admin'),
	getUserCart,
	CartController.clearCart
);

cartRoutes.patch(
	'/update-cart',
	protectRoute,
	restrictTo('buyer', 'admin'),
	getUserCart,
	checkProductInCart,
	CartController.updateCart
);
export default cartRoutes;
