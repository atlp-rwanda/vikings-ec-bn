import { ChatController } from '../../src/controllers/chat.controller';
import { ChatService } from '../../src/services/chat.service';
import { SocketUtil } from '../../src/utils/socket.util';
import { chatMessage } from '../mocks/chat.mock';
import { id, verifiedLogin } from '../mocks/user.mock';
import { closeAll } from '../../src/utils/scheduling.util';
import {
  expect,
  describe,
  test,
  jest,
  it,
  beforeEach,
  afterEach,
} from '@jest/globals';

import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';

beforeEach(async () => {
  await connectDB();
});

let token;

describe('Chat routes tests', () => {
  it('Should Login a verified user', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(verifiedLogin)
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    token = res.body.token;
  });

  test('Successful messaging', async () => {
    const response = await request(app)
      .post('/api/v1/chats')
      .set('Authorization', `Bearer ${token}`)
      .send(chatMessage);

    expect(response.body.message).toEqual('Message sent.');
    expect(response.statusCode).toEqual(200);
  });

  test('Validation test', async () => {
    const response = await request(app)
      .post('/api/v1/chats')
      .set('Authorization', `Bearer ${token}`)
      .send(chatMessage.message);

    expect(response.body.message).toBeUndefined();
    expect(response.statusCode).toEqual(400);
  });

  test('Getting messages', async () => {
    const response = await request(app)
      .get('/api/v1/chats')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.message).toEqual('Fetched all old messages');
    expect(response.statusCode).toEqual(200);
  });

  it('should return a 500 status code and an error message when ChatService.getMessages throws an error', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    ChatService.getMessages = jest
      .fn()
      .mockRejectedValueOnce(new Error('Some error'));
    SocketUtil.socketEmit = jest.fn();

    await ChatController.getMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Some error',
      message: 'Failed to fetch old messages',
    });
  });

  it('should return a 500 status code and an error message when ChatService.saveMessage throws an error', async () => {
    const req = {
      user: { id: id },
      body: { message: 'Hello, world!' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    ChatService.saveMessage = jest
      .fn()
      .mockRejectedValueOnce(new Error('Some error'));
    SocketUtil.socketEmit = jest.fn();

    await ChatController.saveMessage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Some error',
      message: 'Failed to send a new message',
    });
  });
});

afterEach(async () => {
  await closeAll();
});
