/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/database/models';
import { connectDB } from '../../src/app';
import { successRegister } from '../mocks/user.mock';
import { JwtUtility } from '../../src/utils/jwt.util';
import dotenv from 'dotenv';
dotenv.config();

beforeEach(async () => {
  await connectDB();
});

describe('Test User Registration', () => {
  beforeAll(function (done) {
    User.sync({ force: true })
      .then(function () {
        done(null);
      })
      .catch(function (error) {
        done(error);
      });
  });

  test('Successful Registration', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successRegister);
    expect(response.statusCode).toBe(201);
  });

  test('Valid Token Data', async () => {
    const response = JwtUtility.verifyToken(process.env.TEST_TOKEN);
    console.log(response);
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

