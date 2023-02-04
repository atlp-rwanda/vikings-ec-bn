/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import {
  verifiedLogin,
  unverifiedLogin,
  unregisteredLogin,
  invalidPassword,
} from '../mocks/user.mock';
import {expect, describe, test, jest, beforeAll} from '@jest/globals';
import { saveTokens } from '../../src/services/token.service';

beforeAll(async () => {
  await connectDB();
});

describe('POST /login', () => {
  describe('Invalid credentials provided', () => {
    test('Unregistered email: 404 status and error message', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(unregisteredLogin);

      expect(response.body.message).toEqual('User has not found, try again');
      expect(response.statusCode).toEqual(404);
    });
    test('Unverified password: 409 status and error message', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(unverifiedLogin);

      expect(response.body.message).toEqual('User email is not verified');
      expect(response.statusCode).toEqual(409);
    });
    test('Invalid password: 409 status and wrong credentials', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(invalidPassword);

      expect(response.body.message).toEqual('Invalid password, try again.');
      expect(response.statusCode).toEqual(409);
    });
  });
  test('token, success message', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(verifiedLogin);

    expect(response.body.message).toEqual('Login successful');
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
  });

  test('No email: 400', async()=>{
    const response = await request(app).post('/api/v1/users/login');

    expect(response.statusCode).toBe(400);
  });

  test('login user: catch statement', async()=>{
    const requestSpy = jest.spyOn(saveTokens, 'saveToken');
    requestSpy.mockRejectedValue(new Error('Failed to save token'));
    const response = await request(app).post('/api/v1/users/login').send(verifiedLogin);

    expect(response.body.error).toBeDefined();
    requestSpy.mockRestore();
  });
});
