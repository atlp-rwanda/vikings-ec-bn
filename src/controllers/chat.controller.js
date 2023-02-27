import { SocketUtil } from '../utils/socket.util';
import { ChatService } from '../services/chat.service';

export class ChatController {
  static async saveMessage(req, res) {
    try {
      const newMessage = await ChatService.saveMessage({
        senderId: req.user.id,
        message: req.body.message,
      });
      SocketUtil.socketEmit('message', newMessage);
      return res.status(200).json({ message: 'Message sent.', newMessage });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to send a new message',
      });
    }
  }

  static async getMessages(req, res) {
    try {
      const messages = await ChatService.getMessages();
      return res
        .status(200)
        .json({ message: 'Fetched all old messages', messages });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: 'Failed to fetch old messages',
      });
    }
  }
}
