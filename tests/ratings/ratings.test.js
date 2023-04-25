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
import { rate, invalidrate, adminToken,id, buyer } from '../mocks/ratings.mock';
import { RatingService } from '../../src/services/rating.service';



beforeAll(async () => {
    await connectDB();
  });
  let token;
  describe('/rate', () => {

    it('Should Login a verified user', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send(buyer)
        .expect(200);
      expect(res.body).toHaveProperty('message', 'Login successful');
      token = res.body.token;
    });
    it('should return 500', async () => {
      const requestSpy = jest.spyOn(RatingService, 'createRatings');
      requestSpy.mockRejectedValue(new Error('Error occurred while rating a product'));

      const res = await request(app)
          .post('/api/v1/ratings')
          .set('Authorization', `Bearer ${token}`)
          .send(rate);

      console.log(res.body);
      expect(res.statusCode).toBe(500);
      requestSpy.mockRestore();
    });
    test('Rating: 200', async () => {
      const response = await request(app)
        .post('/api/v1/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send(rate);
      expect(response.statusCode).toBe(200);
    });
    test('Rating: 200', async () => {
      const response = await request(app)
          .post('/api/v1/ratings')
          .set('Authorization', `Bearer ${token}`)
          .send(rate);
      expect(response.statusCode).toBe(200);
    });
    test('Rating: 200', async () => {
      const response = await request(app)
        .get(`/api/v1/products/${id}/ratings`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
    it('should return 500', async () => {
      const requestSpy = jest.spyOn(RatingService, 'getProductRatingByField');
      requestSpy.mockRejectedValue(new Error('could not retrieve ratings try again'));

      const res = await request(app)
        .get(`/api/v1/products/${id}/ratings`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toBe(500);
      requestSpy.mockRestore();

    });
    it('should return 500', async () => {
      const requestSpy = jest.spyOn(RatingService, 'updateRatings');
      requestSpy.mockRejectedValue(new Error('Error occurred while rating a product'));

      const res = await request(app)
        .post('/api/v1/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send(rate);
      expect(res.statusCode).toBe(500);
      requestSpy.mockRestore();
    });
    test('Rating: 400', async () => {
      const response = await request(app)
        .post('/api/v1/ratings')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidrate);
        expect(response.body.message).toEqual('Rate must be from 1 to 5');

    });

    it('should return 401', async () => {

      const res = await request(app)
        .post('/api/v1/ratings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(rate);
      expect(res.statusCode).toBe(403);
      expect(res.body.message).toEqual('You have to buy this product first in order to provide ratings and feedback');

    });

});
  afterEach(async () => {
    await closeAll();
  });
