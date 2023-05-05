import { Op } from "sequelize";
import { Sales, Products } from "../database/models/index";
export class SalesService {
  static async createSales(sale) {
    return await Sales.create(sale);
  }
  static async getOrderSales(orderId) {
    return Sales.findAll({ where: { orderId: orderId } });
  }
  static async getSale(saleId) {
    return Sales.findByPk(saleId);
  }
  static async getAllSales() {
    return await Sales.findAll({
        include: [
            {
                model: Products,
                attributes: {
                    exclude: [
                        'seller',
                    ],
                },
            },
        ],
    });
  }
  static async updateSaleStatusById(orderStatus, id) {
    return await Sales.update({ status: orderStatus }, { where: { id: id } });
  }

  static async getAllSalesStats(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
	const sales = await Sales.findAll({
		where: {
      status: 'accepted',
		  createdAt: {
			[Op.between]: [startDate, endDate]
		  }
		}
	  });

    return sales;
  }
}
