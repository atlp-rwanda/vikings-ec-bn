import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
  describe,
  expect,
  beforeAll,
  afterEach,
  it,
  jest,
  test
} from '@jest/globals';
import { closeAll } from '../../src/utils/scheduling.util';
import { buyerToken } from '../mocks/cart.mock';
import { id, sellerId } from '../mocks/user.mock';
import {
  acceptedStatus,
  declinedStatus,
  deliveredStatus,
  invalidSalesId,
  invalidSalesId1,
  invalidStatus,
  shippingStatus,
  validSalesId,
  validSalesId1,
  saleId
} from '../mocks/sales.mock';
import { orderId } from '../mocks/order.mock';
import { SalesService } from '../../src/services/sales.service';
import { SalesController } from '../../src/controllers/sales.controller';
import {
  admin,
  notSeller,
  sellerToken,
  validToken,
} from '../mocks/product.mock';

beforeAll(async () => {
  await connectDB();
});

describe('PATCH /sales', () => {
  test('Check authorization', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .send(acceptedStatus);

    expect(response.body.message).toEqual('Unauthorized request, try again');
    expect(response.statusCode).toEqual(401);
  });
  test('Check if role is seller', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .set('Authorization', `Bearer ${notSeller}`)
      .send(acceptedStatus);

    expect(response.body.message).toEqual(
      'You are not allowed to perform this task'
    );
    expect(response.statusCode).toEqual(403);
  });
  test('Check seller doesn\'t own the product', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .set('Authorization', `Bearer ${validToken}`)
      .send(acceptedStatus);

    expect(response.body.message).toEqual(
      'Product doesn\'t exists in your collection'
    );
    expect(response.statusCode).toEqual(400);
  });

  test('Check product order status updated', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .set('Authorization', `Bearer ${admin}`)
      .send(acceptedStatus);
    expect(response.body.message).toEqual(
      'Product order status has been changed successfully'
    );
    expect(response.statusCode).toEqual(200);
  });

  test('Check invalid id given', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${invalidSalesId}/status`)
      .set('Authorization', `Bearer ${admin}`)
      .send(acceptedStatus);

    expect(response.body.message).toEqual('invalid saleId');
    expect(response.statusCode).toEqual(400);
  });
  test('Check  order status updated', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId1}/status`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(acceptedStatus);

    expect(response.body.message).toEqual(
      'Product order status has been changed successfully'
    );
    expect(response.statusCode).toEqual(200);
  });

  test('Check  order status declined', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId1}/status`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(declinedStatus);

    expect(response.body.message).toEqual(
      'Product order status has been changed successfully'
    );
    expect(response.statusCode).toEqual(200);
  });

  test('Check  product order status delivered', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId1}/status`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(deliveredStatus);

    expect(response.body.message).toEqual(
      'Product order status has been changed successfully'
    );
    expect(response.statusCode).toEqual(200);
  });

  test('Check  order status delivered', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .set('Authorization', `Bearer ${admin}`)
      .send(deliveredStatus);

    expect(response.body.message).toEqual(
      'Product order status has been changed successfully'
    );
    expect(response.statusCode).toEqual(200);
  });

  test('Check  product order status shipping', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId1}/status`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(shippingStatus);

    expect(response.body.message).toEqual(
      'Product order status has been changed successfully'
    );
    expect(response.statusCode).toEqual(200);
  });

  test('Check  order status shipping', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .set('Authorization', `Bearer ${admin}`)
      .send(shippingStatus);

    expect(response.body.message).toEqual(
      'Product order status has been changed successfully'
    );
    expect(response.statusCode).toEqual(200);
  });

  test('Check  invalid order status', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .set('Authorization', `Bearer ${admin}`)
      .send(invalidStatus);

    expect(response.body.error).toEqual(
      'status must be one of pending accepted declined delivered shipping'
    );
    expect(response.statusCode).toEqual(400);
  });

  test('Check  product order doesn\'t exist', async () => {
    const response = await request(app)
      .patch(`/api/v1/sales/${invalidSalesId1}/status`)
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(declinedStatus);

    expect(response.body.message).toEqual('Sale is not found');
    expect(response.statusCode).toEqual(404);
  });
  test('Check product order status updated', async () => {
    const spy = jest.spyOn(SalesService, 'updateSaleStatusById');
    spy.mockImplementation(() => {
      throw new Error('Error updating product order status');
    });

    const response = await request(app)
      .patch(`/api/v1/sales/${validSalesId}/status`)
      .set('Authorization', `Bearer ${admin}`)
      .send(acceptedStatus);

    expect(spy).toHaveBeenCalled();
    expect(response.statusCode).toEqual(500);

    spy.mockRestore();
  });
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
      .get('/api/v1/sales?limit=1&&page=1')
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
    const req = { user: { id: sellerId }, query: { limit: 10, page: 1} };
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
