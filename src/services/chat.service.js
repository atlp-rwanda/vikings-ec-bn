import { Message, User } from '../database/models/index.js';

export class ChatService {
  static async saveMessage(newMessage) {
    const message = await Message.create(newMessage);
    return message;
  }

  static async getMessages() {
    const messages = await Message.findAll({
      include: {
        model: User,
        as: 'sender',
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
    return messages;
  }
}
