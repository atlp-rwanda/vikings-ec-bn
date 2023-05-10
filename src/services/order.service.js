import { Order } from '../database/models/index';
export class OrderService {
	static async createNewOrder(customer, data) {
		const cart = JSON.parse(customer.metadata.cart);
		const { userId: buyerId, paymentId } = customer.metadata;
		const { products } = cart;
		const { amount_total: fullPrice } = data;
		const newOrder = {
			buyerId,
			products,
			fullPrice,
			paymentId
		};
		return await Order.create(newOrder);
	}
	static async getSingleOrder(orderId) {
		return Order.findByPk(orderId);
	}

	static async getAllOrders(limit, page, user) {
		const { role, id } = user;
		const where = role === 'buyer' ? { buyerId: id } : undefined;
		const offset = (page - 1) * limit;
		const { count, rows } = await Order.findAndCountAll({
			where,
			limit: limit,
			offset: offset,
			order: [['updatedAt', 'DESC']],
		});
		const totalPages = Math.ceil(count / limit);
		return {
			items: rows,
			meta: {
				totalItems: count,
				itemCount: rows.length,
				itemsPerPage: limit,
				totalPages,
				currentPage: page,
			},
		};
	}
	static async updateOrderStatusById(orderStatus, id) {
		return await Order.update({ status: orderStatus }, { where: { id: id } });
	}


	static async getOrderByBuyerIdAndProductId(buyerId, productId) {
		const orders = await Order.findAll({
			where: {
				buyerId: buyerId,
				status: 'delivered'
			}
		});
		return orders?.filter(each => each.products?.find(eachProduct => eachProduct.productId === productId));
	}
}
