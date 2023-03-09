import { NotificationService } from '../services/notification.service';
import { knownEvents, subscribe } from '../utils/events.util';
import { knownSockets, SocketUtil } from '../utils/socket.util';

subscribe(knownEvents.onNotification, async (data) => {
  const dbNotification = await NotificationService.saveNotification(data);
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

  static async markAllNotifications(req, res) {
    try {
      const notifications = await NotificationService.updateNotifications(
        { isRead: true },
        { receiverId: req.user.id }
      );
      return res
        .status(200)
        .json({ message: 'Marked all notifications as read', notifications });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to update all notifications',
      });
    }
  }

  static async markOneNotification(req, res) {
    try {
      const notification = await NotificationService.updateNotifications(
        { isRead: true },
        { id: req.query.id, receiverId: req.user.id }
      );
      return res
        .status(200)
        .json({ message: 'Marked one notification as read', notification });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to update one notification',
      });
    }
  }
}
