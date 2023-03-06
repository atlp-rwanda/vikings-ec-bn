import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
  describe,
  expect,
  beforeAll,
  afterEach,
  it,
  jest
} from '@jest/globals';
import { closeAll } from '../../src/utils/scheduling.util';
import { buyerToken } from '../mocks/cart.mock';
import { id, sellerId } from '../mocks/user.mock';
import { saleId } from '../mocks/sales.mock';
import { orderId } from '../mocks/order.mock';
import { SalesService } from '../../src/services/sales.service';
import { SalesController } from '../../src/controllers/sales.controller';
import { sellerToken } from '../mocks/product.mock';

beforeAll(async () => {
  await connectDB();
});
describe('Sales endpoints', () => {
  it('should return 200 status code', async () => {
    const response = await request(app)
      .get(`/api/v1/sales/${orderId}/orderSales`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it('should return 200 status code', async () => {
    const response = await request(app)
      .get('/api/v1/sales/')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });

  it('should return 200 status code on retrieval of sale status', async () => {
    const response = await request(app)
      .get(`/api/v1/sales/${saleId}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send();

    expect(response.statusCode).toEqual(200);
  });
  it('should return 404 status code on sale not found', async () => {
    const response = await request(app)
      .get(`/api/v1/sales/${id}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send();

    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('Sale is not found');

  });

  it('should return an error message if sales cannot be retrieved', async () => {
    const mockReq = { order: { id: orderId } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockError = new Error('Failed to retrieve sales');

    jest.spyOn(SalesService, 'getOrderSales').mockRejectedValue(mockError);

    await SalesController.getOrderSales(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: mockError.message,
      message: 'Could not retrieve sales, try again',
    });
  });

  it('should return a 500 status code and an error message if an error occurs', async () => {
    const req = { user: { id: sellerId } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const mockError = new Error('Database connection error');

    SalesService.getAllSales = jest.fn(() => {
      throw mockError;
    });

    await SalesController.getSales(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: mockError.message,
      message: 'Could not retrieve sales, try again',
    });
  });

});

afterEach(async () => {
  await closeAll();
});
