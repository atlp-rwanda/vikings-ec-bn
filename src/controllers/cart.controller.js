import { CartService } from '../services/cart.service';

export class CartController {
	static async addToCart(req, res) {
		try {
			const { id: userId } = req.user;
			let cart = req.cart;
			let { productId } = req.body;
			let productQuantity = req.body.productQuantity || 1;
			if (!cart) {
				const products = [{ quantity: productQuantity, productId: productId }];
				const newCart = {
					userId,
					products,
				};
				cart = await CartService.createCart(newCart);
			}
			return res.status(201).json({
				product: {id: productId, quantity: productQuantity},
				message: 'Item added to cart successfully',
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				message: 'Could not add product to cart, try again',
			});
		}
	}
}
