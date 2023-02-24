import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
  validCategory,
  existingCategory,
  invalidCategory,
  validToken,
} from '../mocks/product.mock';
import {afterEach} from '@jest/globals';
import {closeAll} from '../../src/utils/scheduling.util';

beforeAll(async () => {
  await connectDB();
});
describe('POST /categories', () => {
  test('Check if category exists', async () => {
    const response = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', `Bearer ${validToken}`)
      .send(existingCategory);

    expect(response.body.message).toEqual('Category already exists');
    expect(response.statusCode).toEqual(409);
  });
  test('Successful add category', async () => {
    const response = await request(app)
      .post('/api/v1/categories')
      .set('Authorization', `Bearer ${validToken}`)
      .send(validCategory);

    expect(response.body.message).toEqual('Category added successfully');
    expect(response.statusCode).toEqual(201);
  });
  test('Invalid category', async()=>{
    const response = await request(app).post('/api/v1/categories').set('Authorization', `Bearer ${validToken}`).send(invalidCategory);

    expect(response.statusCode).toBe(400);
  });
});
afterEach(async () =>{
  await closeAll();
});