/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { successRegister } from '../mocks/user.mock';
import { JwtUtility } from '../../src/utils/jwt.util';
import dotenv from 'dotenv';
dotenv.config();

beforeAll(async () => {
  await connectDB();
});

describe('Test User Registration', () => {
  test('Successful Registration', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
    expect(response.statusCode).toBe(201);
  });

  test('Valid Token Data', async () => {
    const response = JwtUtility.verifyToken(process.env.TEST_TOKEN);
    expect(response.email).toBeDefined();
  });

  test('Email Already Exists', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
    expect(response.statusCode).toBe(409);
  });

  test('Validation Error', async () => {
    const response = await request(app).post('/api/v1/users/register').send({});
    expect(response.statusCode).toBe(400);
  });
});
