import { SalesService } from '../services/sales.service';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import {NotificationController as notify} from './notification.controller';
export class SalesController {
    static async getOrderSales(req, res) {
        try {
            const orderId = req.order.id;
            const sales = await SalesService.getOrderSales(orderId);
            let buyerSales = [];
            for (const sale of sales) {
                buyerSales.push(sale);
            }
            return res.status(200).json({ message: 'All order sales retrieved successfully', buyerSales: buyerSales});
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                message: 'Could not retrieve sales, try again',
            });
        }
    }

    static async getSales(req, res) {
        try {
            const sellerId = req.user.id;
            const sales = await SalesService.getAllSales();
            let sellerSales = [];
            for (const sale of sales) {
                const productId = sale.productId;
                const product = await ProductService.getProductById(productId);
                if (sellerId === product.userId) {
                    sellerSales.push(sale);
                }
            }
            return res.status(200).json({ message: 'All seller sales retrieved successfully', sellerSales: sellerSales });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                message: 'Could not retrieve sales, try again',
            });
        }
    }

    static async getSale(req, res) {
        try {
            const sale = req.sale;
            return res.status(200).json({ message: 'Sale retrieved successfully', sale: sale });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                message: 'Could not retrieve sale, try again',
            });
        }
    }
  static async updateSaleStatus(req, res) {
    try {
      const { status } = req.body;
      const { saleId } = req.params;
      const updateOrderStatus = await SalesService.updateSaleStatusById(
        status,
        saleId
      );

      const { orderId } = req.sale;
      const sales = await SalesService.getOrderSales(orderId);
      const checkSameStatus = sales.every((sale) => sale.status === status);
      if (checkSameStatus) {
          {
              await OrderService.updateOrderStatusById(status, orderId);
              await notify.notifySellersAboutOrder(sales, status);
              await notify.notifyBuyerAboutOrder(orderId,status);
          }
      }
      sales.map((sale) => {
        if (sale.status === 'declined')
          OrderService.updateOrderStatusById('declined', orderId);
      });
      if (updateOrderStatus)
        return res.status(200).json({
          message: 'Product order status has been changed successfully',
        });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to update product order status, try again',
      });
    }
  }
}
