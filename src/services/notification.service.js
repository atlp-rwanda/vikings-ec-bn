import { Notification, User } from '../database/models/index.js';

export class NotificationService {
  static async saveNotification(notification) {
    return Notification.create(notification);
  }

  static async updateNotifications(field, query) {
    return await Notification.update(field, { where: query });
  }

  static async getNotifications(query, limit, page) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Notification.findAndCountAll({
      limit: limit,
      offset: offset,
      where: query,
      order: [['createdAt', 'DESC']],
      include: {
        model: User,
        as: 'receiver',
        attributes: {
          exclude: [
            'password',
            'authCode',
            'mustUpdatePassword',
            'lastTimePasswordUpdated',
          ],
        },
      },
    });
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const totalItems = count;
    return { totalPages, currentPage, totalItems, rows };
  }
}

export const knownNotificationType = {
  changePassword: 'Change password',
  productExpired: 'Product expired',
  productWished: 'Product wished',
  productDeleted: 'Product deleted',
  productAvailable: 'Product available',
  newOrder: 'New order',
  changeOrderStatus: 'Change order status',
  productRating: 'Product rating',
};
