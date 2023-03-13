import app from '../../src/app';
import {
  expect,
  describe,
  test,
  it,
  jest,
  beforeAll,
  afterEach,
} from '@jest/globals';
import { connectDB } from '../../src/app';
import request from 'supertest';
import { closeAll } from '../../src/utils/scheduling.util';
import { productId, buyerToken, rate, invalidrate } from '../mocks/ratings.mock';
import { RatingService } from '../../src/services/rating.service';

beforeAll(async () => {
    await connectDB();
  });
  describe('/rate', () => {
  test('Rating: 201', async () => {
    const response = await request(app)
      .post(`/api/v1/ratings/${productId}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(rate);
    expect(response.statusCode).toBe(201);
  });
  it('should return 201', async () => {
    const requestSpy = jest.spyOn(RatingService, 'productRating');
    requestSpy.mockRejectedValue(new Error('Product rated successfully'));

    const res = await request(app)
      .post(`/api/v1/ratings/${productId}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(rate);
    expect(res.statusCode).toBe(201);
    requestSpy.mockRestore();

  }); 
  it('should return 201', async () => {
    const requestSpy = jest.spyOn(RatingService, 'updateRatings');
    requestSpy.mockRejectedValue(new Error('Error occured while rating a product'));

    const res = await request(app)
      .post(`/api/v1/ratings/${productId}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(rate);
    expect(res.statusCode).toBe(500);
    requestSpy.mockRestore();
  }); 
  test('Rating: 400', async () => {
    const response = await request(app)
      .post(`/api/v1/ratings/${productId}`)
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(invalidrate);
      expect(response.body.message).toEqual('Rate must be from 0 to 5');

  });
});
  afterEach(async () => {
    await closeAll();
  });