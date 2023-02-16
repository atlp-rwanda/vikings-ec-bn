import { CartService } from '../services/cart.service';
import { calculateCartTotal } from '../utils/cart.util';

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
				product: { id: productId, quantity: productQuantity },
				message: 'Item added to cart successfully',
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				message: 'Could not add product to cart, try again',
			});
		}
	}

	static async viewCart(req, res) {
		try {
			const cart = req.cart;
			const cartProducts = await CartService.getCartProducts(cart.products);
			const cartProductDetails = cartProducts.map((product) => ({
				name: product.name,
				price: product.price,
				quantity: product.quantity,
				images: product.images,
			}));
			const cartTotal = calculateCartTotal(cartProductDetails);
			return res.status(200).json({
				id: cart.id,
				products: cartProductDetails,
				total: cartTotal,
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				message: 'Could not retrieve cart, try again',
			});
		}
	}
	static async clearCart(req, res) {
		try {
			const cart = req.cart;
			cart.products = [];
			await CartService.updateCart({ products: cart.products }, cart.id);
			return res.status(200).json({
				id: cart.id,
				message: 'Cart cleared successfully',
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				message: 'Could not clear the cart, try again',
			});
		}
	}

	static async updateCart(req, res) {
		try {
			const { cart } = req;
			const { productId, productQuantity = 0 } = req.body;
			let { products } = cart;

			if (productQuantity === 0) {
				products = products.filter(
					(product) => product.productId !== productId
				);
			} else {
				const productToUpdateIndex = products.findIndex(
					(product) => product.productId === productId
				);
				products[productToUpdateIndex].quantity = productQuantity;
			}

			await CartService.updateCart({ products }, cart.id);

			return res.status(200).json({
				id: cart.id,
				message: 'Cart updated successfully',
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				error: error.message,
				message: 'Could not update the cart, try again',
			});
		}
	}
}
