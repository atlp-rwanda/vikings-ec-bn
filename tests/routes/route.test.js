import request from 'supertest';
import app from '../../src/app';
import {afterEach} from '@jest/globals';
import {closeAll} from '../../src/utils/scheduling.util';
describe('/', () => {
  test('check welcome message', async () => {
    const response = await request(app).get('/api/v1/');
    expect(response.statusCode).toBe(200);
  });
});
afterEach(async () =>{
  await closeAll();
});