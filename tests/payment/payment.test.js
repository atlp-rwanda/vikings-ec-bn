import Stripe from 'stripe';
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
import { buyerToken, jordan, beans } from '../mocks/cart.mock';
import { closeAll } from '../../src/utils/scheduling.util';
import { sessionCompleteEvent as _stripemock } from '../mocks/stripe.mock';
import { differentEvent } from '../mocks/stripe.mock';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});
beforeAll(async () => {
	await connectDB();
});

describe('/payments', () => {
	test('Add product to cart: 201', async () => {
		const response = await request(app)
			.post('/api/v1/carts')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(beans);

		expect(response.statusCode).toBe(201);
	});

	test('Checkout session: 200', async () => {
		const response = await request(app)
			.post('/api/v1/payments/create-checkout-session')
			.set('Authorization', `Bearer ${buyerToken}`);

		expect(response.statusCode).toBe(200);
	});

	test('should return 400 if signature is not valid', async () => {
		const response = await request(app)
			.post('/api/v1/payments/webhook')
			.set('Stripe-Signature', 'invalid_signature')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send({});

		expect(response.statusCode).toEqual(400);
		expect(response.body).toHaveProperty('error');
		expect(response.body).toHaveProperty('message');
	});

	test('Should create order successfully', async () => {
		const stripemock = JSON.stringify(_stripemock);
		const sig = stripe.webhooks.generateTestHeaderString({
			payload: stripemock,
			secret: process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET,
		});

		const event = stripe.webhooks.constructEvent(stripemock, sig, process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET);

		expect(event.id).toEqual(_stripemock.id);

		const response = await request(app).post('/api/v1/payments/webhook').set('stripe-signature', sig).send(_stripemock);
		expect(response.body.message).toBe('Order created successfully');
	});
});


afterEach(async () => {
	await closeAll();
});
