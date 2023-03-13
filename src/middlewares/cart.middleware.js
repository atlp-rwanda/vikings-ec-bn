import { CartService } from '../services/cart.service';

export const getUserCart = async (req, res, next) => {
	const { id: userId } = req.user;
	const userCart = await CartService.getCart(userId);
	req.cart = userCart;
	next();
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
		existingProduct.quantity += productQuantity;
	} else {
		products.push({ quantity: productQuantity, productId: productId });
	}
	await CartService.updateCart({ products }, cart.id);
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
