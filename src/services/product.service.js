import { Op } from 'sequelize';
import { User } from '../database/models/index';
import { Products, Categories, Search } from '../database/models/index';

export class ProductService {
	static async createProduct(product) {
		return await Products.create(product);
	}
	static async createSearchHistory(data) {
		return await Search.create(data);
	}
	static async getSearchHistory(id) {
		return await Search.findOne({where:{buyerId: id}});
	}
	static async updateSearchHistory(data,id) {
		return await Search.update(data,{where:{buyerId:id}});
	}
	static async getAllProducts(limit = 10, page = 1) {
		const offset = (page - 1) * limit;
		const { count, rows } = await Products.findAndCountAll({
			limit: limit,
			offset: offset,
			include: [
				{
					model: User,
					as: 'seller',
					attributes: {
						exclude: [
							'password',
							'authCode',
							'mustUpdatePassword',
							'lastTimePasswordUpdated',
						],
					},
				},
				{ model: Categories },
			],
		});
		const totalPages = Math.ceil(count / limit);
		const currentPage = page;
		const totalItems = count;
		return { totalPages, currentPage, totalItems, rows };
	}
	static async updateProduct(fields, id) {
		return await Products.update({ ...fields }, { where: { id: id } });
	}

	static async getProductById(id) {
		return await Products.findByPk(id);
	}
	static async searchProduct(searchQuery, limit = 10, page = 1) {
		const offset = (page - 1) * limit;
		const { count, rows } = await Products.findAndCountAll({
			limit: limit,
			offset: offset,
			where: searchQuery,
			include: [{ model: Categories }],
		});
		const totalPages = Math.ceil(count / limit);
		const currentPage = page;
		const totalItems = count;
		return { totalPages, currentPage, totalItems, rows };
	}
	static async searchCategoryByName(categoryName) {
		return await Categories.findOne({
			where: { name: categoryName.toLowerCase() },
		});
	}
	static async deleteProduct(id) {
		return await Products.destroy({ where: { id: id } });
	}

	static async getProductsStatsbySeller(start, end, sellerId) {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const products = await Products.findAll({
			where: {
				userId: sellerId,
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
		});
		return products;
	}

	static async getExpiredProductStats(sellerId) {
		const expiredProducts = await Products.findAll({
			where: {
				isExpired: true,
				userId: sellerId
			},
		});
		return expiredProducts;
	}

  static async updateQuantity(productId, quantitySold){
    const product = await Products.findByPk(productId);
    const remainingQuantity = product.quantity - quantitySold;
    return product.update({quantity: remainingQuantity});
  }
}
