/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { adminCredentials, id, invalidId, verifiedLogin } from '../mocks/user.mock';
import dotenv from 'dotenv';
dotenv.config();

beforeEach(async () => {
  await connectDB();
});

describe('Users Endpoints', () => {
  
  let token;
  let invalidToken;

  it('Should Login the admin', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(adminCredentials)
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    token=res.body.token;
  });

  it('Should Login a verified user', async () => {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send(verifiedLogin)
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    invalidToken=res.body.token;
  });

  it('should return 200 on successful update of user role', async () => {    
    const res = await request(app)
      .patch(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'seller' })
      .expect(200);
    expect(res.body).toHaveProperty('message', 'Updated successfully');
  });

  it('should return 400 if the request is not made by an authenticated admin', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/${id}`)
      .send({ role: 'seller' })
      .expect(400);
    expect(res.body).toHaveProperty('message', 'Unauthorized request, try again');
  });

  it('should return 400 if request payload is missing required fields', async () => {
    await request(app)
      .patch(`/api/v1/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400);
  });

  it('should return 404 if the user with the given ID is not found', async () => {
    const res = await request(app)
      .patch(`/api/v1/users/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'seller' })
      .expect(404);
    expect(res.body).toHaveProperty('error', `User with ID = ${invalidId} does not exist`);
});

it('should get all The users', async () => {
   await request(app)
    .get('/api/v1/users')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200);
}); 

it('should restrict access to specified roles', async () => {
  const response = await request(app)
    .patch(`/api/v1/users/${id}`)
    .set('Authorization', `Bearer ${invalidToken}`)
    .send();

  expect(response.statusCode).toBe(403);
  expect(response.body).toEqual({
    message: 'You are not allowed to perform this task',
  });
});

});
