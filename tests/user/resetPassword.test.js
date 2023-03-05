import request from 'supertest';
import app from '../../src/app';
import { connectDB } from '../../src/app';
import { resetEmail, successResetRegister } from '../mocks/user.mock';
import { closeAll } from '../../src/utils/scheduling.util';
import { resetPassword, token } from '../mocks/user.mock';
import dotenv from 'dotenv';
import {describe, expect, test, afterEach, beforeAll, jest} from '@jest/globals';
import {UserService} from '../../src/services/user.service';

dotenv.config();

beforeAll(async () => {
	await connectDB();
});

let resetToken = '';

describe('Test Password reset', () => {
	test('Successful Registration', async () => {
		const response = await request(app)
			.post('/api/v1/users/register')
			.send(successResetRegister);
		expect(response.statusCode).toBe(201);
	});
	test('send email to get token', async () => {
		const response = await request(app)
			.post('/api/v1/users/forgot-password')
			.send(resetEmail);
		const url = new URL(response.body.message);
		const searchParams = new URLSearchParams(url.search);
		resetToken = searchParams.get('token');
		expect(response.statusCode).toBe(200);
		expect(resetToken).toBeDefined();
	});
	test('Invalid email', async () => {
		const response = await request(app)
			.post('/api/v1/users/forgot-password')
			.send();
		expect(response.statusCode).toBe(400);
	});
	test('Successfully sent email', async () => {
		const response = await request(app)
			.post('/api/v1/users/forgot-password')
			.send(resetEmail);
		expect(response.statusCode).toBe(200);
	});

	test('successfully updated', async () => {
		const response = await request(app)
			.patch(`/api/v1/users/reset-password/${resetToken}`)
			.send(resetPassword);
		expect(response.statusCode).toBe(200);
	});

	test('check user doesn\'t exists', async () => {
		const response = await request(app)
			.patch(`/api/v1/users/reset-password/${token}`)
			.send(resetPassword);
		expect(response.statusCode).toBe(404);
	});

	describe('resetValidation file test', () => {
		test('returns a 400 error if the password is too short', async () => {
			const response = await request(app)
				.patch(`/api/v1/users/reset-password/${resetToken}`)
				.send(resetPassword);
			expect(response.statusCode).toBe(200);
		});
		test('returns a 500 error on reset password', async () => {
			const requestSpy = jest.spyOn(UserService, 'updateUser');
			requestSpy.mockRejectedValue(new Error('Failed')); //
			const response = await request(app)
				.patch(`/api/v1/users/reset-password/${resetToken}`)
				.send(resetPassword);
			console.log(response.body);
			expect(response.statusCode).toBe(500);
			requestSpy.mockRestore();
		});

		describe('resetValidation file test', () => {
			test('returns a 400 error if the password is too short', async () => {
				await request(app)
					.patch(`/api/v1/users/reset-password/${resetToken}`)
					.send({ newPassword: 'abc12' })
					.expect(400);
			});
		});
	});
});

afterEach(async () => {
	await closeAll();
});
