import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
export const getUserCart = async (req, res, next) => {
	const { id: userId } = req.user;
	const userCart = await CartService.getCart(userId);
	req.cart = userCart;
	next();
};

export const checkProductNotExpired = async (req, res, next) => {
	const { productId } = req.body;
	const product = await ProductService.getProductById(productId);
	if(product.isExpired)
		return res.status(400).json({
				message: 'Product has expired',
			});
	return next();
};

export const addProductToCart = async (req, res, next) => {
	const cart = req.cart;
	let { productId } = req.body;
	let productQuantity = req.body.productQuantity || 1;
	if (!cart) {
		return next();
	}
	const products = cart.products;
	const existingProduct = products.find((p) => p.productId === productId);
	if (existingProduct) {
		const product = await ProductService.getProductById(productId);
		if (product.quantity >= productQuantity) {
			existingProduct.quantity = productQuantity;
			await CartService.updateCart({ products: cart.products }, cart.id);
		} else {
			return res.status(400).json({
				message: 'Not enough products in stock',
			});
		}
	} else {
		const newProduct = { quantity: productQuantity, productId: productId };
		cart.products.push(newProduct);
		await CartService.updateCart({ products: cart.products }, cart.id);
	}
	req.cart = cart;
	next();
};

export const checkCartNotEmpty = async (req, res, next) => {
	const cart = req.cart;
	if (!cart) {
		return next();
	}
	if (cart.products.length === 0) {
		return res.status(400).json({ message: 'Cart is empty' });
	}
	next();
};

export const checkNoCartForPayment = async (req, res, next)=>{
	const cart = req.cart;
	if(!cart){
		return res.status(400).json({message: 'You have no cart'});
	}
	return next();
};

export const checkProductInCart = async (req, res, next) => {
	const cart = req.cart;
	let { productId } = req.params;
	if (!cart) {
		return next();
	}
	const products = cart.products;
	const existingProduct = products.find((p) => p.productId === productId);
	if (!existingProduct) {
		return res.status(404).json({ message: 'Product not in cart' });
	}
	next();
};
