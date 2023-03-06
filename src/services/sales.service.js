import { Sales } from '../database/models/index';
export class SalesService {

	static async getOrderSales(orderId) {
		return Sales.findAll({ where: { orderId: orderId } });
	}

	static async getSale(saleId) {
		return Sales.findByPk(saleId);
	}
	static async getAllSales() {
		return Sales.findAll();
	}
}