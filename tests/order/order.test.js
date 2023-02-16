import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
  describe,
  expect,
  beforeAll,
  afterEach,
  it,
} from '@jest/globals';
import { closeAll } from '../../src/utils/scheduling.util';
import { buyerToken } from '../mocks/cart.mock';
import { id } from '../mocks/user.mock';
import { adminToken, orderId } from '../mocks/order.mock';

beforeAll(async () => {
  await connectDB();
});
describe('Order endpoints', () => {
  it('List all orders for Admin', async () => {
    const response = await request(app)
      .get('/api/v1/orders?limit=1&&page=1')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('All Orders retrieved successfully');

  });
  it('List all orders for Buyer', async () => {
    const response = await request(app)
      .get('/api/v1/orders?limit=1&&page=1')
      .set('Authorization', `Bearer ${buyerToken}`);

    expect(response.statusCode).toEqual(200);
  });

  it('should return 200 status code on retrieval of order status', async () => {
    const response = await request(app)
      .get(`/api/v1/orders/${orderId}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
  it('should return 404 status code on order not found', async () => {
    const response = await request(app)
      .get(`/api/v1/orders/${id}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send();

    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('Order not found');

  });
  it('should return 500 status code', async () => {
    const response = await request(app)
      .get('/api/v1/orders/')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send();
    expect(response.statusCode).toEqual(500);
    expect(response.body.message).toEqual('Could not retrieve order, try again');
  });

});

afterEach(async () => {
  await closeAll();
});
