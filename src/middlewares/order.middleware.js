import { OrderService } from '../services/order.service';

export const checkIfOrderExists = async (req, res, next) => {
    const orderId = req.params.orderId;
    const order = await OrderService.getSingleOrder(orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    req.order = order;
    next();
};