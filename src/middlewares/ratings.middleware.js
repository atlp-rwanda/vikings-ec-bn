import { OrderService } from '../services/order.service';

export const validateRating = async (req, res, next) => {
  const rate = req.body.rate;
  if (rate < 1 || rate >5) {
    return res.status(400).json({
      message: 'Rate must be from 1 to 5',
    });
  }
  next();
};

export const checkIfUserBoughtProduct = async (req, res, next) => {
  const productId = req.body.productId;
  const buyerId = req.user.id;
  const orders = await OrderService.getOrderByBuyerIdAndProductId(buyerId, productId);
  if (orders.length === 0) {
    return res.status(403).json({
      message: 'You have to buy this product first in order to provide ratings and feedback',
    });
  }
  next();
};