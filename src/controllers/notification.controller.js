import {NotificationService} from '../services/notification.service';
import {knownEvents, subscribe} from '../utils/events.util';
import {knownSockets, SocketUtil} from '../utils/socket.util';

subscribe(knownEvents.onNotification, async (data) => {
    const dbNotification = await NotificationService.saveNotification(data);
    SocketUtil.socketEmit(`${knownSockets.notification}.${data.receiverId}`, dbNotification);
});
export class NotificationController {
    static async getNotifications(req, res) {
        try {
            const { limit, page } = req.query;
            const notifications = await NotificationService.getNotifications({receiverId:req.user.id},limit, page);
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
}
