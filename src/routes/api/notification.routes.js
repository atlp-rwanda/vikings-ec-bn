import express from 'express';
import { protectRoute } from '../../middlewares/auth.middleware.js';
import { NotificationController } from '../../controllers/notification.controller';
import { validatePagination } from '../../validations/notification/notification.validation';
import {
  checkIfHasNotificationId,
  checkIfHasUnread,
  receivedPaginationFormat,
} from '../../middlewares/notification.middeware';
import { uuidValidation } from '../../validations/user/userId.validation.js';

const router = express.Router();

router
  .route('/')
  .get(
    protectRoute,
    validatePagination,
    receivedPaginationFormat,
    NotificationController.getNotifications
  );

router.patch(
  '/:notificationId',
  protectRoute,
  uuidValidation('notificationId'),
  checkIfHasNotificationId,
  NotificationController.markOneNotification
);

router.patch(
  '/',
  protectRoute,
  checkIfHasUnread,
  NotificationController.markAllNotifications
);

export default router;
