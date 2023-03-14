import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
	describe,
	test,
	expect,
	beforeAll,
	afterEach,
} from '@jest/globals';
import { buyerToken, airMax } from '../mocks/cart.mock';
import { closeAll } from '../../src/utils/scheduling.util';

beforeAll(async () => {
	await connectDB();
});

describe('/payments', () => {
	test('Add product to cart: 201', async () => {
		const response = await request(app)
			.post('/api/v1/carts')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(airMax);

		expect(response.statusCode).toBe(201);
	});
	test('Cancel payment: 200', async()=>{
		const response = await request(app).get('/api/v1/payments/cancel');
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Payment canceled');
	});
	test('Complete payment and create order: 200', async () => {
		const session = await request(app)
			.post('/api/v1/payments/create-checkout-session')
			.set('Authorization', `Bearer ${buyerToken}`);

		expect(session.statusCode).toBe(200);

		const response = await request(app).get(`/api/v1/payments/success?paymentId=${session.body.sessionId}`);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('order');
	});
	test('Checkout without cart: 400', async () => {
		const response = await request(app)
			.post('/api/v1/payments/create-checkout-session')
			.set('Authorization', `Bearer ${buyerToken}`);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toEqual('You have no cart');
	});
});

afterEach(async () => {
	await closeAll();
});
