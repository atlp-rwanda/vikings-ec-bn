import request from 'supertest';
import app from '../../src/app';
import {afterEach, expect, test, describe} from '@jest/globals';
import {closeAll} from '../../src/utils/scheduling.util';
describe('/', () => {
  test('check welcome message', async () => {
    const response = await request(app).get('/api/v1/');
    expect(response.statusCode).toBe(200);
  });
  test('check welcome message', async () => {
    const response = await request(app).get('/api/v2/users/produ');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Path does not found, try again');
});
});
afterEach(async () =>{
  await closeAll();
});