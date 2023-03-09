import { NotificationService } from '../services/notification.service';

export const checkIfHasUnread = async (req, res, next) => {
  const unRead = await NotificationService.getNotifications(
    { receivedId: req.user.id, isRead: false },
    null,
    null
  );
  if (!unRead) {
    return res
      .status(400)
      .json({ message: 'You do not have unread notifications' });
  }
  next();
};

export const receivedPaginationFormat = async (req, res, next) => {
  req.query = {
    limit: req.query['limit'] || '10',
    page: req.query['page'] || '1',
  };
  next();
};

export const receivedId = async (req, res, next) => {
  req.query = {
    id: req.query['id'] || '',
  };
  next();
};
