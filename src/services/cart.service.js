import { Cart } from '../database/models/index';
import { ProductService } from './product.service';
export class CartService {
	static async getCart(userId) {
		return Cart.findOne({ where: { userId: userId } });
	}

	static async createCart(cart) {
		return Cart.create(cart);
	}

	static async updateCart(fields, cartId) {
		return await Cart.update({ ...fields }, { where: { id: cartId } });
	}

	static async getCartProducts(products) {
		return await Promise.all(
			products.map(async (product) => {
				const productDetails = await ProductService.getProductById(
					product.productId
				);
				return { ...product, ...productDetails.dataValues };
			})
		);
	}
}
