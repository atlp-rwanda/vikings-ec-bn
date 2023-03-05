import express from 'express';
import { protectRoute } from '../../middlewares/auth.middleware.js';
import {NotificationController} from '../../controllers/notification.controller';
import {validatePagination} from '../../validations/notification/notification.validation';
import {receivedPaginationFormat} from '../../middlewares/notification.middeware';

const router = express.Router();

router
    .route('/')
    .get(protectRoute,validatePagination,receivedPaginationFormat,
        NotificationController.getNotifications);

export default router;
