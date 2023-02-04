/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import httpMocks from 'node-mocks-http';
import { UserController } from '../../src/controllers/user.controller';
import { googleProfile, token } from '../mocks/user.mock';
import { connectDB } from '../../src/app';
import { googlePass } from '../../src/authentication/passport.authentication';
googlePass();

beforeAll(async () => {
  await connectDB();
});

describe('Testing google authentication', () => {
  test('Successful google login', async () => {
    const response = httpMocks.createResponse();
    await UserController.googleAuthHandler(
      {
        user: googleProfile,
      },
      response
    );
    expect(response.statusCode).toBe(302);
  });

  test('Testing the success redirect', async () => {
    const response = await request(app).get(
      `/api/v1/users/redirect/?key=${token}`
    );

    expect(response.body.message).toEqual('Thanks for logging in');
    expect(response.statusCode).toEqual(200);
  });

  test('Testing the failed redirect', async () => {
    const response = await request(app).get('/api/v1/users/redirect');

    expect(response.body.error).toEqual('Unauthorized');
    expect(response.statusCode).toEqual(401);
  });
});
