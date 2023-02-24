import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {describe, test, expect, beforeAll} from '@jest/globals';
import { beans, buyerToken, jordan, randomProductId } from '../mocks/cart.mock';

beforeAll(async () => {
  await connectDB();
});

describe('POST /cart', ()=>{
  test('No authorization: 400 and unauthorized message', async ()=>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').send(randomProductId);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Unauthorized request, try again');
  });
  test('No product: 400 and required message', async ()=>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').set('Authorization', `Bearer ${buyerToken}`);
    expect(response.statusCode).toEqual(400);
  });
  test('Product: 200', async()=>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').set('Authorization', `Bearer ${buyerToken}`).send(beans);

    expect(response.statusCode).toBe(201);
  });
  test('Same Product: 200', async()=>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').set('Authorization', `Bearer ${buyerToken}`).send(beans);

    expect(response.statusCode).toBe(201);
  });
  test('New Product: 200', async()=>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').set('Authorization', `Bearer ${buyerToken}`).send(jordan);

    expect(response.statusCode).toBe(201);
  });
  test('New Product: 200', async()=>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').set('Authorization', `Bearer ${buyerToken}`).send(jordan);

    expect(response.statusCode).toBe(201);
  });
  test('Existing product: 200', async()=>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').set('Authorization', `Bearer ${buyerToken}`).send(jordan);

    expect(response.statusCode).toBe(201);
  });
  test('Unavailable Product: 404', async() =>{
    const response = await request(app).post('/api/v1/cart/add-to-cart').set('Authorization', `Bearer ${buyerToken}`).send(randomProductId);

    expect(response.statusCode).toBe(404);
  });
});
