import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  jest,
} from '@jest/globals';
import { beans, beansId, buyerToken, expiredProduct, invalidQuantity, jordan, jordanId, randomId, randomProductId, updateBeans } from '../mocks/cart.mock';
import { CartService } from '../../src/services/cart.service';
import { closeAll } from '../../src/utils/scheduling.util';

beforeAll(async () => {
	await connectDB();
});

describe('/cart', () => {
  test('Quantity not in stock: 400', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(invalidQuantity);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Not enough products in stock');
  });
  test('No authorization: 400 and unauthorized message', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .send(randomProductId);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Unauthorized request, try again');
  });
  test('No cart: 500 and message', async () => {
    const response = await request(app)
      .get('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`);
    expect(response.statusCode).toBe(500);
  });
  test('No product: 400 and required message', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send();

    expect(response.statusCode).toEqual(400);
  });
  test('Clear non existent cart: 500', async () =>{
    const response = await request(app).put('/api/v1/carts').set('Authorization', `Bearer ${buyerToken}`);
    expect(response.statusCode).toBe(500);
  });
  test('Remove product when there is no cart: 500', async() =>{
    const response = await request(app).patch(`/api/v1/carts/${jordanId}`).set('Authorization', `Bearer ${buyerToken}`);
    expect(response.statusCode).toBe(500);
  });
  test('Reject create product: 500', async () => {
    const requestSpy = jest.spyOn(CartService, 'createCart');
    requestSpy.mockRejectedValue(new Error('Failed to create Cart'));
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(beans);

    expect(response.statusCode).toBe(500);
    requestSpy.mockRestore();
  });
  test('Product: 200', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(beans);

    expect(response.statusCode).toBe(201);
  });
  test('Quantity not in stock: 400', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(updateBeans);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Not enough products in stock');
  });
  test('One product: 200 and total', async () => {
    const response = await request(app)
      .get('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.total).toEqual(1500);
  });
  test('Same Product: 200', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(beans);

    expect(response.statusCode).toBe(201);
  });
  test('New Product: 200', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(jordan);

    expect(response.statusCode).toBe(201);
  });
  test('New Product: 200', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(jordan);

    expect(response.statusCode).toBe(201);
  });
  test('Existing product: 200', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(jordan);

    expect(response.statusCode).toBe(201);
  });
  test('Unavailable Product: 404', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(randomProductId);

		expect(response.statusCode).toBe(404);
	});
  test('Product: 200', async () => {
    const requestSpy = jest.spyOn(CartService, 'updateCart');
    requestSpy.mockRejectedValue(new Error('Failed to create Cart'));
    const response = await request(app)
      .put('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(jordan);

    expect(response.statusCode).toBe(500);
    requestSpy.mockRestore();
  });
  test('Cleared cart: 200', async () =>{
    const response = await request(app).put('/api/v1/carts').set('Authorization', `Bearer ${buyerToken}`);

    expect(response.statusCode).toBe(200);
  });
  test('Clear empty cart: 400', async () =>{
    const response = await request(app).put('/api/v1/carts').set('Authorization', `Bearer ${buyerToken}`);

    expect(response.statusCode).toBe(400);
  });
  test('New product: 200', async ()=>{
    const response = await request(app).post('/api/v1/carts').set('Authorization', `Bearer ${buyerToken}`).send(beans);

    expect(response.statusCode).toBe(201);
  });
  test('Remove product: 200', async ()=>{
    const response =  await request(app).patch(`/api/v1/carts/${beansId}`).set('Authorization', `Bearer ${buyerToken}`);
    expect(response.statusCode).toBe(200);
  });
  test('Remove product when product not available: 400', async ()=>{
    const response = await request(app).patch(`/api/v1/carts/${randomId}`).set('Authorization', `Bearer ${buyerToken}`);

    expect(response.statusCode).toBe(404);
  });
  test('Remove product when product not in cart: 400', async() =>{
    const response = await request(app).patch(`/api/v1/carts/${jordanId}`).set('Authorization', `Bearer ${buyerToken}`);
    expect(response.statusCode).toBe(404);
  });
  test('Expired product: 400', async () => {
    const response = await request(app)
      .post('/api/v1/carts/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(expiredProduct);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Product has expired');
  });
});

afterEach(async () => {
  await closeAll();
});
