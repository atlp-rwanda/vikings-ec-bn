import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { adminCredentials, id, invalidId, verifiedLogin } from '../mocks/user.mock';
import dotenv from 'dotenv';
import { UserService } from '../../src/services/user.service';
import { UserController } from '../../src/controllers/user.controller';
import { checkDisabledAccount } from '../../src/middlewares/user.middleware';
import { expect, describe, test, jest, it, beforeEach, afterEach } from '@jest/globals';
import { closeAll } from '../../src/utils/scheduling.util';
dotenv.config();

beforeEach(async () => {
  await connectDB();
});

describe('Users Endpoints', () => {

  let token;
  let invalidToken;

  it('Should Login the admin', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(adminCredentials)
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    token = res.body.token;
  });

  it('Should Login a verified user', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(verifiedLogin)
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    invalidToken = res.body.token;
  });

  it('should return 200 on successful update of user role', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'seller' })
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Updated successfully');
  });

  it('should return 500', async () => {
    const requestSpy = jest.spyOn(UserService, 'updateUser');
    requestSpy.mockRejectedValue(new Error('Failed to update'));

    const res = await request(app)
      .patch(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'seller' });

    expect(res.statusCode).toBe(500);
    requestSpy.mockRestore();

  });

  it('should return 400 if the request is not made by an authenticated admin', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/${id}`)
      .send({ role: 'seller' })
      .expect(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized request, try again');
  });

  it('should return 400 if request payload is missing required fields', async () => {
    await request(app)
      .patch(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400);
  });

  it('should return 404 if the user with the given ID is not found', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'seller' })
      .expect(404);
    expect(res.body).toHaveProperty('message', 'User does not exist');
  });

  it('should restrict access to specified roles', async () => {
    const response = await request(app)
      .patch(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .send();

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({
      message: 'You are not allowed to perform this task',
    });
  });

  it('should get all The users', async () => {
    await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .expect(200);
  });

  it('should return 200 on successful disabling of account', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ isActive: false })
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Account is disabled');
  });

  it('should return 200 on successful enabling of account', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ isActive: true })
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Account is enabled');
  });

  it('should return 400 if the request is not made by an authenticated admin', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${id}`)
      .send({ isActive: true })
      .expect(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized request, try again');
  });

  it('should return 400 if request payload is missing required fields', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400);
    expect(res.body).toHaveProperty('error', 'isActive is required');
  });


  it('should return 404 if the user with the given ID is not found', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ isActive: true })
      .expect(404);
    expect(res.body).toHaveProperty('message', 'User does not exist');
  });

  it('should restrict access to specified roles', async () => {
    const response = await request(app)
      .put(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .send();

    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({
      message: 'You are not allowed to perform this task',
    });
  });

  it('should return 500 with an error message and a "Failed to update" message when an error is thrown', async () => {
    const req = { body: { isActive: false }, user: { id: id } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };
    const errorMessage = 'Database error';
    const updateUserMock = jest.spyOn(UserService, 'updateUser').mockRejectedValue(new Error(errorMessage));

    await UserController.accountStatus(req, res);

    expect(updateUserMock).toHaveBeenCalledWith({ isActive: false }, id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage, message: 'Failed to update' });

    updateUserMock.mockRestore();
  });

  it('should return 403 status code and error message if user account is disabled', async () => {
    const req = { user: { isActive: false } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await checkDisabledAccount(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Your account has been disabled' });
    expect(next).not.toHaveBeenCalled();
  });

  test('User find all ', async () => {
    let result = await UserService.findAll();
    expect(result).toBeDefined();
  });

  test('Force user to change password', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'paterne@gmail.com', password: 'Password@2023' });
    const { token } = res.body;
    const response = await request(app).get('/api/v1/users/profile').set('Authorization', 'Bearer ' + token);

    expect(response.statusCode).toBe(401);
  });

  it('should return  an error retrieving the orders', async () => {
    const mockError = new Error('Some error occurred');
    jest.spyOn(UserService, 'getAllUsers').mockRejectedValue(mockError);

    const res = await request(app)
      .get('/api/v1/users?limit=10&page=1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(500);
  });


});
afterEach(async () => {
  await closeAll();
});
