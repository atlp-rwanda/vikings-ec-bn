import app from '../../src/app';
import request from 'supertest';
import { connectDB } from '../../src/app';
import { successReg } from '../mocks/user.mock';
import {afterEach} from '@jest/globals';
import {closeAll} from '../../src/utils/scheduling.util';

beforeEach(async () => {
  await connectDB();
});
let testToken = '';
describe('Test User Logout', () => {
  test('Token added to db', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(successReg);
    expect(response.body.token).toBeDefined();
    testToken = response.body.token;
  });
  test('Logout successful', async () => {
    const response = await request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', `Bearer ${testToken}`);
    expect(response.statusCode).toBe(200);
  });
  test('Check revoked token', async () => {
    const response = await request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', `Bearer ${testToken}`);
    expect(response.statusCode).toBe(401);
  });
  test('Check unauthorized request', async () => {
    const response = await request(app)
      .post('/api/v1/users/logout')
      .set('Authorization', 'Bearer ');
    expect(response.statusCode).toBe(400);
  });
});
afterEach(async () =>{
  await closeAll();
});