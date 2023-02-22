import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { successRegister } from '../mocks/user.mock';
import { JwtUtility } from '../../src/utils/jwt.util';
import { UserService } from '../../src/services/user.service';
import { jwtTokens } from '../../src/database/models/index';
import dotenv from 'dotenv';
import {afterEach} from '@jest/globals';
import {closeAll} from '../../src/utils/scheduling.util';
import {sellerToken} from '../mocks/user.mock';
dotenv.config();

let userToken = '';
beforeEach(async () => {
  await connectDB();
});

describe('Test User Registration', () => {
  test('Successful Registration', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
      userToken = response.body.token;
    expect(response.statusCode).toBe(201);
  });

  test('Generate token', () => {
    const data = {email: successRegister.email};
    const token = JwtUtility.generateToken(data);
    expect(token).not.toBe('');
  });

  test('Email confirmation successfully', async() => {
    const response = await request(app)
      .get(`/api/v1/users/verify-email/${userToken}`);
    expect(response.statusCode).toBe(200);
    });

    test('should return status 500 when failed to update user verification', async () => {
      await jwtTokens.update({ revoked: false }, {
        where: { token: userToken }
    });
      const mockVerify = jest.spyOn(UserService, 'updateUser');
      mockVerify.mockRejectedValue(new Error('Failed to retrieve update a user'));
      const response = await request(app)
      .get(`/api/v1/users/verify-email/${userToken}`);

      expect(response.status).toBe(500);
      mockVerify.mockRestore();
    });

    test('Invalid token to verify email', async() => {
      const response = await request(app)
        .get('/api/v1/users/verify-email/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwNmM3ZDM1LTkzOWItNGUwZi1hNDk4LTJjMzg4MTZkNjUxYiIsImVtYWlsIjoibnNoaW1peWVqYXlkMjAwQGdtYWlsLmNvbSIsInJvbGUiOiJzZWxsZXIiLCJpYXQiOjE2NzYzMjEyNjN9.wyzXakVFWGaLd0gIubc3BX_Bx2ta4KyyNcqxfskjLHU7');
      expect(response.statusCode).toBe(403);
      });

  test('Valid Token Data', async () => {
    const response = JwtUtility.verifyToken(process.env.TEST_TOKEN);
    expect(response.email).toBeDefined();
  });

  test('Validation Error', async () => {
    const response = await request(app).post('/api/v1/users/register').send({});
    expect(response.statusCode).toBe(400);
  });

test('Valid Token Data', async () => {
    const response = JwtUtility.verifyToken(process.env.TEST_TOKEN);
    expect(response.email).toBeDefined();
  });

  test('Resend verification email', async () => {
    const response = await request(app)
    .post('/api/v1/users/resend-verify-email')
    .send({email: successRegister.email});
    expect(response.statusCode).toBe(200);
  });

  test('Email is not exists', async () => {
    const response = await request(app)
    .post('/api/v1/users/resend-verify-email')
    .send({email: 'newemail@gmail.com'});
    expect(response.statusCode).toBe(404);
  });


  test('Email Already Exists', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
    expect(response.statusCode).toBe(409);
  });

});
afterEach(async () =>{
  await closeAll();
});