import { Message, User } from '../database/models/index.js';

export class ChatService {
  static async saveMessage(newMessage) {
    const message = await Message.create(newMessage);
    return message;
  }

  static async getOneMessage(id) {
    const newMessage = await Message.findOne({
      where: {
        id: id,
      },
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
    return newMessage;
  }

  static async getMessages(limit, offset) {
    const { count, rows } = await Message.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
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
    const totalMessages = count;
    return { totalMessages, rows };
  }
}
