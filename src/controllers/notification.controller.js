import {
  knownNotificationType,
  NotificationService,
} from '../services/notification.service';
import { eventEmit, knownEvents, subscribe } from '../utils/events.util';
import { knownSockets, SocketUtil } from '../utils/socket.util';
import { WishService } from '../services/wishlist.service';
import { sendEmail } from '../utils/sendEmail.util';
import { emailConfig } from '../utils/mail.util';
import { notificationTemplete } from '../utils/mailTemplates.util';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';

subscribe(knownEvents.onNotification, async (data) => {
  const user = await UserService.getUserById(data.receiverId);
  const dbNotification = await NotificationService.saveNotification(data);
  sendEmail(
    emailConfig({
      email: user.email,
      subject: 'Notification',
      content: notificationTemplete({ ...data, firstname: user.firstname }),
    })
  );
  SocketUtil.socketEmit(
    `${knownSockets.notification}.${data.receiverId}`,
    dbNotification
  );
});
export class NotificationController {
  static async getNotifications(req, res) {
    try {
      const { limit, page } = req.query;
      const notifications = await NotificationService.getNotifications(
        { receiverId: req.user.id },
        limit,
        page
      );
      return res
        .status(200)
        .json({ message: 'Fetched all notifications', notifications });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to fetch notifications',
      });
    }
  }
  static async notifyProductLovers(productId, type, message) {
    const wishes = await WishService.getWishesFromProduct(productId);
    wishes.forEach((eachWish) => {
      eventEmit(knownEvents.onNotification, {
        type,
        message,
        receiverId: eachWish.userId,
      });
    });
  }
  static async getProductSale(sales) {
    return Promise.all(
      sales.map((sale) => {
        return new Promise((resolve, reject) => {
          ProductService.getProductById(sale.productId)
            .then((product) => {
              resolve({ product, sale });
            })
            .catch(reject);
        });
      })
    );
  }
  static async notifySellersOnBuyProduct(sales, buyerId) {
    eventEmit(knownEvents.onNotification, {
      type: knownNotificationType.newOrder,
      message: ' Your order was received successfully. We will keep you updated. ',
      receiverId: buyerId,
    });
    const salesProduct = await NotificationController.getProductSale(sales);
    const buyer = await UserService.getUserById(buyerId);
    salesProduct.map((each) => {
      return eventEmit(knownEvents.onNotification, {
        type: knownNotificationType.newOrder,
        message: `You have a new order made by ${buyer.firstname} ${buyer.lastname}. 
           ${each.sale.quantitySold} ${each.product.name} `,
        receiverId: each.product.userId,
      });
    });
  }
  static async notifySellersAboutOrder(sales, status) {
    const salesProduct = await NotificationController.getProductSale(sales);
    salesProduct.map((each) => {
      return eventEmit(knownEvents.onNotification, {
        type: knownNotificationType.changeOrderStatus,
        message: `order with id ${each.orderId} has been ${status} `,
        receiverId: each.product.userId,
      });
    });
  }
  static async notifyBuyerAboutOrder(orderId, status) {
    const order = await OrderService.getSingleOrder(orderId);
    eventEmit(knownEvents.onNotification, {
      type: knownNotificationType.changeOrderStatus,
      message: ` Your order has been ${status} `,
      receiverId: order.buyerId,
    });
  }
  static async notifySellerAboutProductRating(ratings) {
    const product = await ProductService.getProductById(ratings.productId);
    eventEmit(knownEvents.onNotification, {
      type: knownNotificationType.productRating,
      message: `Your product ${product.name} was rated with ${ratings.rate} stars`,
      receiverId: product.userId,
    });
  }

  static async markAllNotifications(req, res) {
    try {
      await NotificationService.updateNotifications(
        { isRead: true },
        { receiverId: req.user.id }
      );
      return res
        .status(200)
        .json({ message: 'Marked all notifications as read' });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to update all notifications',
      });
    }
  }

  static async markOneNotification(req, res) {
    try {
      await NotificationService.updateNotifications(
        { isRead: true },
        { id: req.params.notificationId, receiverId: req.user.id }
      );
      return res
        .status(200)
        .json({ message: 'Marked one notification as read' });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to update the notification',
      });
    }
  }
}
