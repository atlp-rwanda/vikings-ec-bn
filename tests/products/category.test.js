import app from '../../src/app';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
	validCategory,
	existingCategory,
	invalidCategory,
	validToken,
} from '../mocks/product.mock';
import { Categories } from '../../src/database/models/index';
import {
	jest,
	afterEach,
	beforeAll,
	describe,
	test,
	expect,
} from '@jest/globals';
import { closeAll } from '../../src/utils/scheduling.util';
import {
	addCategory,
	getCategories,
} from '../../src/controllers/category.controller';

beforeAll(async () => {
	await connectDB();
});
describe('POST /categories', () => {
	test('Check if category exists', async () => {
		const response = await request(app)
			.post('/api/v1/categories')
			.set('Authorization', `Bearer ${validToken}`)
			.send(existingCategory);

		expect(response.body.message).toEqual('Category already exists');
		expect(response.statusCode).toEqual(409);
	});
	test('Successful add category', async () => {
		const response = await request(app)
			.post('/api/v1/categories')
			.set('Authorization', `Bearer ${validToken}`)
			.send(validCategory);

		expect(response.body.message).toEqual('Category added successfully');
		expect(response.statusCode).toEqual(201);
	});
	test('Invalid category', async () => {
		const response = await request(app)
			.post('/api/v1/categories')
			.set('Authorization', `Bearer ${validToken}`)
			.send(invalidCategory);

		expect(response.statusCode).toBe(400);
	});

	test('should return an error if Categories.create throws an error', async () => {
		Categories.create = jest.fn(() => {
			throw new Error('test error');
		});
		const req = { body: { name: 'Test Category' } };
		const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
		await addCategory(req, res);
		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			error: 'test error',
			message: 'Error while creating a category',
		});
	});
});
test('Given invalid category', async () => {
	const response = await request(app)
		.post('/api/v1/categories')
		.set('Authorization', `Bearer ${validToken}`)
		.send(invalidCategory);

	expect(response.body.error).toEqual('name is not allowed to be empty');
	expect(response.statusCode).toEqual(400);
});
test('Retrieve categories', async () => {
	const response = await request(app)
		.get('/api/v1/categories')
		.set('Authorization', `Bearer ${validToken}`);

	expect(response.statusCode).toBe(200);
	expect(response.body).toHaveProperty('categories');
});
test('should return an error if Categories.findAll throws an error', async () => {
	Categories.findAll = jest.fn(() => {
		throw new Error('test error');
	});
	const req = {};
	const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
	await getCategories(req, res);
	expect(res.status).toHaveBeenCalledWith(500);
	expect(res.json).toHaveBeenCalledWith({
		error: 'test error',
		message: 'Could not retrieve categories, try again',
	});
});
afterEach(async () => {
	await closeAll();
});
