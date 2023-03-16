
import { OrderService } from '../services/order.service';

export class OrderController {
    static async getAllOrders(req, res) {
        try {
            const { limit, page } = req.query;
            const orders = await OrderService.getAllOrders(limit, page, req.user);
            return res.status(200).json({ message: 'All Orders retrieved successfully', orders: orders });
        } catch (error) {
            return res.status(500).json({
                error: error.message,
                message: 'Could not retrieve order, try again',
            });
        }
    }

    static async getOrder(req, res) {
        return res.status(200).json({ message: 'Order status retrieved successfully', order: req.order });
    }
}
