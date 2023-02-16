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
			const { products } = cart;
			const ids = products.map((product) => product.productId);
			const productsData = await CartService.getCartProducts(ids);
			const productsDataWithQuantity = productsData.map((product, index) => ({
				name: product.name,
				price: product.price,
				quantity: products[index].quantity,
				images: product.images,
			}));
			const cartTotal = calculateCartTotal(productsDataWithQuantity);
			return res.status(200).json({
				id: cart.id,
				products: productsDataWithQuantity,
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
				message: 'Could not clear cart, try again',
			});
		}
	}

	static async removeFromCart(req, res) {
		try {
			const cart = req.cart;
			const { productId } = req.params;
			const productToRemove = cart.products.findIndex(
				(product) => product.productId === productId
			);
			cart.products.splice(productToRemove, 1);
			await CartService.updateCart({ products: cart.products }, cart.id);
			return res.status(200).json({
				id: cart.id,
				message: 'Item removed from cart successfully',
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message,
				message: 'Could not remove item from cart, try again',
			});
		}
	}
}
