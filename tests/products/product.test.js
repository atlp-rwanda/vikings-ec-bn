import app from '../../src/app';
import { expect, describe, test, jest, it, beforeAll, afterEach } from '@jest/globals';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
  invaliCategoryProduct,
  notSeller,
  validToken,
  validProduct,
  validProduct2,
  invalidProduct,
  productId,
  productId1
} from '../mocks/product.mock';
import { closeAll } from '../../src/utils/scheduling.util';
import { ProductService } from '../../src/services/product.service';
import { removeExpiredProducts } from '../../src/controllers/product.controller';

beforeAll(async () => {
  await connectDB();
});
describe('POST /Product', () => {
  test('Check authorization', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .send(validProduct);

    expect(response.body.message).toEqual('Unauthorized request, try again');
    expect(response.statusCode).toEqual(400);
  });

  test('Check seller', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${notSeller}`);

    expect(response.body.message).toEqual(
      'You are not allowed to perform this task'
    );
    expect(response.statusCode).toEqual(403);
  });

  test('Invalid product details', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${validToken}`)
      .field(invalidProduct);

    expect(response.body.error).toEqual('name is not allowed to be empty');
    expect(response.statusCode).toEqual(400);
  });
  test('Invalid Category Provided', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${validToken}`)
      .field(invaliCategoryProduct);

    expect(response.body.message).toEqual('Category doesn\'t exist');
    expect(response.statusCode).toEqual(404);
  });

  test('Check for invalid extensions', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${validToken}`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/sample.pdf`)
      .field(validProduct);
    expect(response.body.message).toEqual(
      'Invalid extension for file \'sample.pdf\''
    );
    expect(response.statusCode).toEqual(400);
  });

  test('valid product details', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${validToken}`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .field(validProduct);
    expect(response.body.message).toEqual('Product created successfully');
    expect(response.statusCode).toEqual(201);
  });

  test('Check existing product', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${validToken}`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .field(validProduct);
    expect(response.body.message).toEqual('Product already exists');
    expect(response.statusCode).toEqual(409);
  });

  test('Check if images are atleast 4', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${validToken}`)
      .field(validProduct2)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`);
    expect(response.body.message).toEqual('Please insert at least 4 images');
    expect(response.statusCode).toEqual(400);
  });

  test('Check fail to create product', async () => {
    const requestSpy = jest.spyOn(ProductService, 'getAllProducts');
    requestSpy.mockRejectedValue(new Error('Failed to retrieve product'));
    const response = await request(app)
      .get('/api/v1/products')
      .set('Authorization', `Bearer ${validToken}`);
    expect(response.statusCode).toBe(500);
    requestSpy.mockRestore();
  });


  it('should return a 500 error if ProductService.updateProduct() throws an error', async () => {
    const errorMessage = 'Failed to update product';
    jest.spyOn(ProductService, 'updateProduct').mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const req = {
      body: { isExpired: true, isAvailable: false, }, params: { productId: productId, },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    await removeExpiredProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: errorMessage,
      message: 'Failed to remove expired product from list',
    });
    ProductService.updateProduct.mockRestore();
  });
});

afterEach(async () => {
  await closeAll();
});

describe('GET /Product', () => {
  test('List all products for role seller', async () => {
    const response = await request(app)
      .get('/api/v1/products?limit=1&&page=1')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.body).toHaveProperty('products');
    expect(response.statusCode).toEqual(200);
  });

  test('List all products for role buyer', async () => {
    const response = await request(app)
      .get('/api/v1/products?limit=1&&page=1')
      .set('Authorization', `Bearer ${notSeller}`);

    expect(response.body).toHaveProperty('products');
    expect(response.statusCode).toEqual(200);
  });

  test('Expired product was removed successfully', async () => {
    const response = await request(app)
      .patch(`/api/v1/products/${productId1}/expired`)
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        isExpired:true,
        isAvailable:false
      });

    expect(response.body.message).toEqual('Expired product was removed successfully');
  });
});
