import express from 'express';
import { protectRoute } from '../../middlewares/auth.middleware.js';
import { NotificationController } from '../../controllers/notification.controller';
import { validatePagination } from '../../validations/notification/notification.validation';
import {
  checkIfHasUnread,
  receivedId,
  receivedPaginationFormat,
} from '../../middlewares/notification.middeware';

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
  '/mark/:id',
  protectRoute,
  receivedId,
  NotificationController.markOneNotification
);

router.patch(
  '/mark',
  protectRoute,
  checkIfHasUnread,
  NotificationController.markAllNotifications
);

export default router;
