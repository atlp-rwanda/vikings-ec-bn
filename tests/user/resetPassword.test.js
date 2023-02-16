import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { resetEmail, successResetRegister } from '../mocks/user.mock';
import { JwtUtility } from '../../src/utils/jwt.util';
import {
  successPasswordUpdate,
  invalidPasswordUpdate,
  verifiedLogin,resetPassword
} from '../mocks/user.mock';
import dotenv from 'dotenv';
import { describe, expect } from '@jest/globals';
dotenv.config();

beforeAll(async () => {
    await connectDB();
  });

let resetToken = '';
let newPassword = 'Sracerimo@123'

  describe('Test Password reset', () => {
    describe('signup to make a user',() => {
      test('Successful Registration', async () => {
        const response = await request(app)
          .post('/api/v1/users/register')
          .send(successResetRegister);
        expect(response.statusCode).toBe(201);
      }); 
    })

    describe('Test getting the token from email sent', () => {
      test('send email to get token', async () => {
        const response = await request(app)
          .post('/api/v1/users/reset')
          .send(resetEmail);
        const url = new URL(response.body.message);
        const searchParams = new URLSearchParams(url.search);
        resetToken = searchParams.get('token');
        console.log(response.body)
        expect(response.statusCode).toBe(200);
        expect(resetToken).toBeDefined();
      });
    });

    describe('email sent successful',() => {
      test('Successfully sent email', async () => {
        const response = await request(app)
          .post('/api/v1/users/reset')
          .send(resetEmail);
        expect(response.statusCode).toBe(200);
      }); 
    });

    describe('reseting password from email',()=>{
      test('successfully updated', async() => {
        const response = await request(app)
        .patch(`/api/v1/users/reset-password/${resetToken}`)
        .send(resetPassword);
        console.log(resetPassword)
        expect(response.statusCode).toBe(200);
      })
    })
  });