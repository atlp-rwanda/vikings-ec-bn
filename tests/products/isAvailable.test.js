import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { closeAll } from '../../src/utils/scheduling.util';
import { describe, expect, test, afterEach, beforeAll } from '@jest/globals';
import { id,validToken } from '../mocks/product.mock';


beforeAll(async () => {
	await connectDB();
});


describe('Validation file test', () => {
      test('Validation Error', async () => {
        const response = await request(app)
          .put(`/api/v1/products/${id}`)
          .set('Authorization', `Bearer ${validToken}`)
          .send();
        expect(response.statusCode).toBe(400);
      });
      
});

afterEach(async () => {
	await closeAll();
});