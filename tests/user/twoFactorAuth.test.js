import { expect, describe, test, beforeAll } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import {

	invalidOTP,
	sellerId,
	sellerUser,
	randomId
} from '../mocks/user.mock';


beforeAll(async () => {
	await connectDB();
});

describe('Testing 2 FA', () => {
	test('Successful: code sent', async () => {
		const response = await request(app)
			.post('/api/v1/users/login/')
			.send(sellerUser);
			
		expect(response.statusCode).toEqual(403);
		expect(response.body.message).toBe('Check your email for verification code');
	});

	test('No auth code: Bad request', async()=>{
		const response = await request(app).post(`/api/v1/users/login/verify/${sellerId}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBe('authCode is required');
	});

	test('Invalid user id: User does not exist', async()=>{
		const response = await request(app).post(`/api/v1/users/login/verify/${randomId}`).send({authCode: '123456'});

		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe('User does not exist');
	});

	test('Invalid authCode: Code does not match. Try again', async()=>{
		const response = await request(app).post(`/api/v1/users/login/verify/${sellerId}`).send({authCode: invalidOTP});

		expect(response.statusCode).toBe(403);
		expect(response.body.message).toBe('Code does not match. Try again');
	});

});
