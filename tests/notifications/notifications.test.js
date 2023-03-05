import {
  afterEach,
  describe,
  expect,
  jest,
  test,
  it,
  beforeAll,
} from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import { adminCredentials, verifiedLogin, id } from '../mocks/user.mock';
import { NotificationService } from '../../src/services/notification.service';
import { NotificationController } from '../../src/controllers/notification.controller';
import { closeAll } from '../../src/utils/scheduling.util';
import { connectDB } from '../../src/app';

beforeAll(async () => {
  await connectDB();
});

describe('Test notifications', () => {
  test('Getting notifications', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(adminCredentials);
    const { token } = response.body;
    expect(token).toBeDefined();
    const res = await request(app)
      .get('/api/v1/notifications')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(200);
  });
  test('wrong limit in getting notifications notifications', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(adminCredentials);
    const { token } = response.body;
    expect(token).toBeDefined();
    const res = await request(app)
      .get('/api/v1/notifications?limit=x')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(400);
  });
  test('wrong page in getting notifications notifications', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(adminCredentials);
    const { token } = response.body;
    expect(token).toBeDefined();
    const res = await request(app)
      .get('/api/v1/notifications?page=eric')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(400);
  });

  test('fail to get notifications', async () => {
    const requestSpy = jest.spyOn(NotificationService, 'getNotifications');
    requestSpy.mockRejectedValue(new Error('Failed to retrieve posts')); // mock it throws an Error object

    const response = await request(app)
      .post('/api/v1/users/login')
      .send(adminCredentials);
    const { token } = response.body;
    expect(token).toBeDefined();
    const res = await request(app)
      .get('/api/v1/notifications')
      .set('Authorization', 'Bearer ' + token);
    expect(res.statusCode).toBe(500);
    requestSpy.mockRestore();
  });
});

describe('', () => {
  let token;
  let token2;

  test('token, success message', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(verifiedLogin);
    expect(response.body.message).toEqual('Login successful');
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    token = response.body.token;
  });

  test('token, success message', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(adminCredentials);
    expect(response.body.message).toEqual('Login successful');
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    token2 = response.body.token;
  });

  test('Marking all notifications as read', async () => {
    const response = await request(app)
      .patch('/api/v1/notifications/')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toEqual('Marked all notifications as read');
    expect(response.statusCode).toEqual(200);
  });

  test('Marking one notification as read', async () => {
    const response = await request(app)
      .patch('/api/v1/notifications/6db24f63-8110-4162-bc5e-a7641e7c92f1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toEqual('Marked one notification as read');
    expect(response.statusCode).toEqual(200);
  });

  test('Notification not found', async () => {
    const response = await request(app)
      .patch('/api/v1/notifications/6db24f63-8116-4162-bc5e-a7641e7c92f3')
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toEqual('Notification not found');
    expect(response.statusCode).toEqual(404);
  });

  test('No unread notifications', async () => {
    const response = await request(app)
      .patch('/api/v1/notifications/')
      .set('Authorization', `Bearer ${token2}`);
    expect(response.body.message).toEqual(
      'You do not have unread notifications'
    );
    expect(response.statusCode).toEqual(404);
  });

  it('should return a 500 status code from NotificationService.updateNotifications', async () => {
    const req = { user: { id: id } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    NotificationService.updateNotifications = jest
      .fn()
      .mockRejectedValueOnce(new Error('Some error'));

    await NotificationController.markAllNotifications(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Some error',
      message: 'Failed to update all notifications',
    });
  });

  it('should return a 500 status code from NotificationService.updateNotifications', async () => {
    const req = {
      user: { id: id },
      params: { id: '6db24f63-8110-4162-bc5e-a7641e7c92f1' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    NotificationService.updateNotifications = jest
      .fn()
      .mockRejectedValueOnce(new Error('Some error'));

    await NotificationController.markOneNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Some error',
      message: 'Failed to update the notification',
    });
  });
});

afterEach(async () => {
  await closeAll();
});
