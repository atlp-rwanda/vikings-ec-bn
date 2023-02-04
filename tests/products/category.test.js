         
import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import { validCategory,existingCategory,invalidCategory, validToken } from '../mocks/product.mocks';

beforeAll(async () => {
    await connectDB();
  });
  describe('POST /category', () => {
      test('Check if category exists', async () => {
        const response = await request(app)
          .post('/api/v1/category')
          .set('Authorization', `Bearer ${validToken}`)
          .send(existingCategory);
  
        expect(response.body.message).toEqual('Category already exists!');
        expect(response.statusCode).toEqual(400);
      });
      test('Successful add category', async () => {
        const response = await request(app)
          .post('/api/v1/category')
          .set('Authorization', `Bearer ${validToken}`)
          .send(validCategory);
  
        expect(response.body.message).toEqual('Category added');
        expect(response.statusCode).toEqual(201);
      });
    });