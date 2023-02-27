import express from 'express';
import { protectRoute } from '../../middlewares/auth.middleware';
import { ChatController } from '../../controllers/chat.controller';
import validateChatMessage from '../../validations/chat/chat.validation';

const router = express.Router();

router
  .route('/')
  .get(protectRoute, ChatController.getMessages)
  .post(protectRoute, validateChatMessage, ChatController.saveMessage);

export default router;
