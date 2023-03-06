import { Orders } from '../database/models/index';
export class OrderService {
	static async getSingleOrder(orderId) {
		return Orders.findByPk(orderId);
	}

	static async getAllOrders(limit, page, user) {
		const { role, id } = user;
		const where = role === 'buyer' ? { buyerId: id } : undefined;
		const offset = (page - 1) * limit;
		const { count, rows } = await Orders.findAndCountAll({
			where,
			limit: limit,
			offset: offset,
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
}