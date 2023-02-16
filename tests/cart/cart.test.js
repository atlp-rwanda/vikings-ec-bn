import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import { describe, test, expect, beforeAll } from '@jest/globals';
import {
	beans,
	buyerToken,
	jordan,
	randomProductId,
	updateBeans,
} from '../mocks/cart.mock';

beforeAll(async () => {
	await connectDB();
});

describe('/cart', () => {
	test('No authorization: 400 and unauthorized message', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.send(randomProductId);

		expect(response.statusCode).toEqual(400);
		expect(response.body.message).toEqual('Unauthorized request, try again');
	});
	test('No cart: 500 and message', async () => {
		const response = await request(app)
			.get('/api/v1/cart/view-cart')
			.set('Authorization', `Bearer ${buyerToken}`);

		expect(response.statusCode).toBe(500);
	});
	test('No product: 400 and required message', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send();

		expect(response.statusCode).toEqual(400);
	});
	test('Product: 200', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(beans);

		expect(response.statusCode).toBe(201);
	});
	test('One product: 200 and total', async () => {
		const response = await request(app)
			.get('/api/v1/cart/view-cart')
			.set('Authorization', `Bearer ${buyerToken}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.total).toEqual(1500);
	});
	test('Updated quantity: 200 and new total', async () => {
		const response = await request(app)
			.patch('/api/v1/cart/update-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(updateBeans);

		expect(response.statusCode).toBe(200);
	});
	test('Update: product not in cart', async ()=>{
		const response = await request(app).patch('/api/v1/cart/update-cart').set('Authorization', `Bearer ${buyerToken}`).send(randomProductId);

		expect(response.statusCode).toBe(404);
		expect(response.body.message).toEqual('Product not in cart');
	});
	test('One product: 200 and total', async () => {
		const response = await request(app)
			.get('/api/v1/cart/view-cart')
			.set('Authorization', `Bearer ${buyerToken}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.total).toEqual(3000);
	});
	test('Cart cleared successfully', async () => {
		const response = await request(app)
			.post('/api/v1/cart/clear-cart')
			.set('Authorization', `Bearer ${buyerToken}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe('Cart cleared successfully');
	});
	test('Cart has been cleared', async () => {
		const response = await request(app)
			.get('/api/v1/cart/view-cart')
			.set('Authorization', `Bearer ${buyerToken}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.total).toEqual(0);
	});
	test('Same Product: 200', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(beans);

		expect(response.statusCode).toBe(201);
	});
	test('New Product: 200', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(jordan);

		expect(response.statusCode).toBe(201);
	});
	test('New Product: 200', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(jordan);

		expect(response.statusCode).toBe(201);
	});
	test('Existing product: 200', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(jordan);

		expect(response.statusCode).toBe(201);
	});
	test('Unavailable Product: 404', async () => {
		const response = await request(app)
			.post('/api/v1/cart/add-to-cart')
			.set('Authorization', `Bearer ${buyerToken}`)
			.send(randomProductId);

		expect(response.statusCode).toBe(404);
	});
});
