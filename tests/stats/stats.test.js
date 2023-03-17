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
import { closeAll } from '../../src/utils/scheduling.util';
import { end, sellerToken, start, invalidDate } from '../mocks/stats.mock';
import { statsValidation } from '../../src/validations/stats/stats.validation';

beforeAll(async () => {
    await connectDB();
  });

  describe('statistics', () => {
    test('Unauthorized request: 400 and unauthorized message', async () => {
      const response = await request(app)
        .get('/api/v1/stats/')
        .send();
      expect(response.statusCode).toEqual(400);
      expect(response.body.message).toEqual('Unauthorized request, try again');
    });
    
    test('Good request and getting the stats', async () => {
        const response = await request(app)
          .get(`/api/v1/stats/?start=${start}&end=${end}&include=sales,expired,wishes,product-created`)
          .set('Authorization', `Bearer ${sellerToken}`)
          .send();
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual('statistics');
      });

      test('request with no include status: 200', async () => {
        const response = await request(app)
          .get(`/api/v1/stats/?start=${start}&end=${end}`)
          .set('Authorization', `Bearer ${sellerToken}`)
          .send();
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual('statistics');
      });

      test('missing date with include status: 400', async () => {
        const response = await request(app)
          .get(`/api/v1/stats/?start=&end=${end}`)
          .set('Authorization', `Bearer ${sellerToken}`)
          .send();
        expect(response.statusCode).toEqual(400);
        expect(response.body.error).toEqual('Missing required query parameter(s).');
      });

      test('out of range or non-existing date status: 400', async () => {
        const response = await request(app)
          .get(`/api/v1/stats/?start=${invalidDate}&end=${end}`)
          .set('Authorization', `Bearer ${sellerToken}`)
          .send();
        expect(response.statusCode).toEqual(400);
        expect(response.body.error).toEqual('Invalid or out-of-range date(s).');
      });

      test('out of range or non-existing date status: 400', async () => {
        const response = await request(app)
          .get(`/api/v1/stats/?start=${start}&end=${end}&include=solas,expired,wishes,product-created`)
          .set('Authorization', `Bearer ${sellerToken}`)
          .send();
        expect(response.statusCode).toEqual(400);
        expect(response.body.error).toEqual('Invalid include value(s).');
      });

      test('when we include wishes: 200', async () => {
        const response = await request(app)
          .get(`/api/v1/stats/?start=${start}&end=${end}&include=wishes`)
          .set('Authorization', `Bearer ${sellerToken}`)
          .send();
        expect(response.statusCode).toEqual(200);
      });

      test('when we include sales: 200', async () => {
        const response = await request(app)
          .get(`/api/v1/stats/?start=${start}&end=${end}&include=sales`)
          .set('Authorization', `Bearer ${sellerToken}`)
          .send();
        expect(response.statusCode).toEqual(200);
      });

      test('valid query parameters should call next', async () => {
        const next = jest.fn();
        const req = { query: { start: `${start}`, end: `${end}` } };
        const res = {};
        await statsValidation(req, res, next);
        expect(next).toHaveBeenCalled();
      });
  })