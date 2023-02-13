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

beforeAll(async () => {
  await connectDB();
});

describe('POST /login', () => {
  describe('Invalid credentials provided', () => {
    test('Unregistered email: 404 status and error message', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send(unregisteredLogin);

      expect(response.body.message).toEqual('Wrong credentials, try again.');
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

      expect(response.body.message).toEqual('Wrong credentials, try again.');
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
});
