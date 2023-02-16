export const calculateCartTotal = (cartProducts) => {
	const cartTotal = cartProducts.reduce((total, product) => {
		return total + product.quantity * product.price;
	}, 0);

	return cartTotal;
};
