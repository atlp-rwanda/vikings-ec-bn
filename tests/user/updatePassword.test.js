import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import {
  successPasswordUpdate,
  invalidPasswordUpdate,
  verifiedLogin,
} from '../mocks/user.mock';
import {expect, describe, test, jest, beforeAll, afterEach} from '@jest/globals';
import { UserService } from '../../src/services/user.service';
import dotenv from 'dotenv';
import {closeAll} from '../../src/utils/scheduling.util';
import { sellerToken } from '../mocks/product.mock';
dotenv.config();

beforeAll(async () => {
  await connectDB();
});

let token = '';

describe('Test Password Update', () => {
  describe('Test getting the token from registering', () => {
    test('Register to get the token', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(verifiedLogin);
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
      token = response.body.token;
    });
  });

  test('Success Update', async () => {
    const response = await request(app)
      .patch('/api/v1/users/update-password')
      .set('Authorization', `Bearer ${token}`)
      .send(successPasswordUpdate);
    expect(response.statusCode).toBe(200);
  });

  test('Validation Error', async () => {
    const response = await request(app)
      .patch('/api/v1/users/update-password')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(response.statusCode).toBe(400);
  });

  test('Unauthorized Update', async () => {
    const response = await request(app)
      .patch('/api/v1/users/update-password')
      .send(successPasswordUpdate);
    expect(response.statusCode).toBe(400);
  });

  test('Invalid old password', async () => {
    const response = await request(app)
      .patch('/api/v1/users/update-password')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidPasswordUpdate);
    expect(response.statusCode).toBe(409);
  });

  test('update user: catch statement', async()=>{
    const requestSpy = jest.spyOn(UserService, 'updateUser');
    requestSpy.mockRejectedValue(new Error('Failed to update'));

    const response = await request(app)
      .patch('/api/v1/users/update-password')
      .set('Authorization', `Bearer ${token}`)
      .send(successPasswordUpdate);

    expect(response.statusCode).toBe(500);
    requestSpy.mockRestore();

  });
  test('Check uses password', async () => {
    const response = await request(app)
      .patch('/api/v1/users/update-password')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(successPasswordUpdate);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('User doesn\'t use password');
  });
});
afterEach(async () =>{
  await closeAll();
});
