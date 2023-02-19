import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
  invaliCategoryProduct,
  notSeller,
  validToken,
} from '../mocks/product.mock';
import {
  validProduct,
  validProduct2,
  invalidProduct,
} from '../mocks/product.mock';

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

    expect(response.body.message).toEqual("Category doesn't exist");
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
      "Invalid extension for file 'sample.pdf'"
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
});
