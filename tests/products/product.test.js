import app from '../../src/app';
import {
	expect,
	describe,
	test,
	jest,
	it,
	beforeAll,
	afterEach,
} from '@jest/globals';
import { connectDB } from '../../src/app';
import request from 'supertest';
import {
	invaliCategoryProduct,
	invalidProductId,
	notSeller,
	sellerToken,
	unavailableProduct,
	validProductId,
	validProductId1,
	validToken,
	validProduct,
	validProduct2,
	invalidProduct,
	id,
	productId,
	productId1,
	admin,
	validDateProduct,
  updateProductWithChangedAllImages,
  updateProductWithLessImages,
  updateProductWithNochangedImages,
	updateWithOneImage
} from '../mocks/product.mock';
import { closeAll } from '../../src/utils/scheduling.util';
import { ProductService } from '../../src/services/product.service';
import { removeExpiredProducts } from '../../src/controllers/product.controller';
import { validCategory } from '../mocks/product.mock';
import { successBuyerRegister, buyerToken } from '../mocks/user.mock';
beforeAll(async () => {
	await connectDB();
});
describe('POST /Product', () => {
	test('Check authorization', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.send(validProduct);

		expect(response.body.message).toEqual('Unauthorized request, try again');
		expect(response.statusCode).toEqual(400);
	});

	test('Check seller', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${notSeller}`);

		expect(response.body.message).toEqual(
			'You are not allowed to perform this task'
		);
		expect(response.statusCode).toEqual(403);
	});

	test('Invalid product details', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.field(invalidProduct);

		expect(response.body.error).toEqual('name is not allowed to be empty');
		expect(response.statusCode).toEqual(400);
	});
	test('Invalid Category Provided', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.field(invaliCategoryProduct);

		expect(response.body.message).toEqual("Category doesn't exist");
		expect(response.statusCode).toEqual(404);
	});

	test('Check for invalid extensions', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/sample.pdf`)
			.field(validProduct);
		expect(response.body.message).toEqual(
			"Invalid extension for file 'sample.pdf'"
		);
		expect(response.statusCode).toEqual(400);
	});
	test('Check fail to create product', async () => {
		const requestSpy = jest.spyOn(ProductService, 'createProduct');
		requestSpy.mockRejectedValue(new Error('Failed to create product'));
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.field(validProduct);
		expect(response.statusCode).toBe(500);
		requestSpy.mockRestore();
	});
	test('valid product details', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.field(validProduct);
		expect(response.body.message).toEqual('Product created successfully');
		expect(response.statusCode).toEqual(201);
	});

	test('Check invalid date', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.field(validDateProduct);
		expect(response.body.message).toEqual('Invalid expiration date');
		expect(response.statusCode).toEqual(400);
	});

	test('Check existing product', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.field(validProduct);
		expect(response.body.message).toEqual('Product already exists');
		expect(response.statusCode).toEqual(409);
	});

	test('Check if images are atleast 4', async () => {
		const response = await request(app)
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`)
			.field(validProduct2)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`);
		expect(response.body.message).toEqual('Please insert at least 4 images');
		expect(response.statusCode).toEqual(400);
	});

	test('Check fail to create product', async () => {
		const requestSpy = jest.spyOn(ProductService, 'getAllProducts');
		requestSpy.mockRejectedValue(new Error('Failed to retrieve product'));
		const response = await request(app)
			.get('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`);
		expect(response.statusCode).toBe(500);
		requestSpy.mockRestore();
	});

	it('should return a 500 error if ProductService.updateProduct() throws an error', async () => {
		const errorMessage = 'Failed to update product';
		jest.spyOn(ProductService, 'updateProduct').mockImplementation(() => {
			throw new Error(errorMessage);
		});
		const req = {
			body: { isExpired: true, isAvailable: false },
			params: { productId: productId },
		};
		const res = {
			status: jest.fn(() => res),
			json: jest.fn(),
		};
		await removeExpiredProducts(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.json).toHaveBeenCalledWith({
			error: errorMessage,
			message: 'Failed to remove expired product from list',
		});
		ProductService.updateProduct.mockRestore();
	});
	test('Successful Registration', async () => {
		const response = await request(app)
			.post('/api/v1/users/register')
			.send(successBuyerRegister);
		buyerToken.token = response.body.token;
		expect(response.statusCode).toBe(201);
	});

	test('Searching for a product with name', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ name: validProduct.name, limit: 1, page: 1 })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(200);
	});

	test('Searching for a product with maximum price', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ maxPrice: validProduct.price, limit: 1, page: 1 })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(200);
	});

	test('Searching for a product with minimum price', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ minPrice: validProduct.price, limit: 1, page: 1 })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(200);
	});
	test('Searching for a product with minimum and maximum price', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({
				maxPrice: validProduct.price,
				minPrice: validProduct.price,
				limit: 1,
				page: 1,
			})
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(200);
	});

	test('Searching for a product with expire date', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ expireDate: validProduct.expiryDate, limit: 1, page: 1 })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(200);
	});

	test('Searching for a product with category', async () => {
		validCategory.name = 'food';
		await request(app)
			.post('/api/v1/categories')
			.set('Authorization', `Bearer ${validToken}`)
			.send(validCategory);
		const response = await request(app)
			.get('/api/v1/products')
			.query({ category: validCategory.name, limit: 1, page: 1 })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(200);
	});

	test('Searching for a product with category', async () => {
		validCategory.name = 'cars';
		const a = await request(app)
			.post('/api/v1/categories')
			.set('Authorization', `Bearer ${sellerToken}`)
			.send(validCategory);
		const response = await request(app)
			.get('/api/v1/products')
			.query({ category: validCategory.name, limit: 1, page: 1 })
			.set('Authorization', `Bearer ${sellerToken}`);
		expect(response.statusCode).toBe(403);
	});
	test('Searching for a product with invalid category', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ category: 'clothingf', limit: 1, page: 1 })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(500);
	});

	test('Searching for a product with empty values', async () => {
		const response = await request(app)
			.get('/api/v1/products?page=0')
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(500);
	});

	test('Searching for a product with invalid product name', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ name: 'clothingf&%>' })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(400);
	});

	test('Searching for a product with invalid category name', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ category: 'clothingf&%>' })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(400);
	});

	test('Searching for a product with invalid minimum price', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ minPrice: '1000a' })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(400);
	});

	test('Searching for a product with invalid maximum price', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ maxPrice: '1000a' })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(400);
	});

	test('Searching for a product with invalid expire date', async () => {
		const response = await request(app)
			.get('/api/v1/products')
			.query({ expireDate: '2022-02-212' })
			.set('Authorization', `Bearer ${buyerToken.token}`);
		expect(response.statusCode).toBe(400);
	});
});
describe('GET /Products:productId', () => {
	test("Check seller doesn't own the product", async () => {
		const response = await request(app)
			.get(`/api/v1/products/${validProductId}`)
			.set('Authorization', `Bearer ${sellerToken}`);
		expect(response.body.message).toEqual(
			"Product doesn't exists in your collection"
		);
		expect(response.statusCode).toEqual(400);
	});

	test('Check seller own the product', async () => {
		const response = await request(app)
			.get(`/api/v1/products/${validProductId1}`)
			.set('Authorization', `Bearer ${sellerToken}`);
		expect(response.body).toHaveProperty('product');
		expect(response.statusCode).toEqual(200);
	});

	test("Check product doesn't exist", async () => {
		const response = await request(app)
			.get(`/api/v1/products/${invalidProductId}`)
			.set('Authorization', `Bearer ${validToken}`);
		expect(response.body.message).toEqual('Product not found');
		expect(response.statusCode).toEqual(404);
	});

	test('Given valid productId but not available', async () => {
		const response = await request(app)
			.get(`/api/v1/products/${unavailableProduct}`)
			.set('Authorization', `Bearer ${notSeller}`);
		expect(response.body.message).toEqual('Product is not available');
		expect(response.statusCode).toEqual(404);
	});

	test('Given valid productId and available', async () => {
		const response = await request(app)
			.get(`/api/v1/products/${validProductId}`)
			.set('Authorization', `Bearer ${notSeller}`);
		expect(response.body).toHaveProperty('product');
		expect(response.statusCode).toEqual(200);
	});

	test('Check failed to retrieve', async () => {
		const response = await request(app)
			.get('/api/v1/products?page=0')
			.set('Authorization', `Bearer ${notSeller}`);
		expect(response.body.message).toBe('Failed to retrieve products');
		expect(response.statusCode).toEqual(500);
	});
});

afterEach(async () => {
	await closeAll();
});

describe('GET /Product', () => {
	test('List all products for role seller', async () => {
		const response = await request(app)
			.get('/api/v1/products?limit=1&&page=1')
			.set('Authorization', `Bearer ${validToken}`);

		expect(response.body).toHaveProperty('products');
		expect(response.statusCode).toEqual(200);
	});

	test('List all products for role buyer', async () => {
		const response = await request(app)
			.get('/api/v1/products?limit=1&&page=1')
			.set('Authorization', `Bearer ${notSeller}`);

		expect(response.body).toHaveProperty('products');
		expect(response.statusCode).toEqual(200);
	});

	test('Expired product was removed successfully', async () => {
		const response = await request(app)
			.patch(`/api/v1/products/${productId1}/expired`)
			.set('Authorization', `Bearer ${admin}`)
			.send({
				isExpired: true,
				isAvailable: false,
			});

		expect(response.body.message).toEqual(
			'Expired product was removed successfully'
		);
	});
	test('Check fail to create product', async () => {
		const requestSpy = jest.spyOn(ProductService, 'getAllProducts');
		requestSpy.mockRejectedValue(new Error('Failed to retrieve product'));
		const response = await request(app)
			.get('/api/v1/products')
			.set('Authorization', `Bearer ${validToken}`);
		expect(response.statusCode).toBe(500);
		requestSpy.mockRestore();
	});
});
describe('UPDATE/product', () => {
	test('should  update product', async () => {
		const response = await request(app)
			.patch(`/api/v1/products/${id}`)
			.set('Authorization', `Bearer ${validToken}`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.field(updateProductWithNochangedImages);

		expect(response.statusCode).toBe(200);
	});
  test('should  update product with changed images', async () => {
    const response = await request(app)
      .patch(`/api/v1/products/${id}`)
      .set('Authorization', `Bearer ${validToken}`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .field(updateProductWithChangedAllImages);

    expect(response.statusCode).toBe(200);
  });
	test('should  update product with one changed image', async () => {
    const response = await request(app)
      .patch(`/api/v1/products/${id}`)
      .set('Authorization', `Bearer ${validToken}`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .field(updateWithOneImage);
    expect(response.statusCode).toBe(200);
  });
  test('should  update product with less than 4 images', async () => {
    const response = await request(app)
      .patch(`/api/v1/products/${id}`)
      .set('Authorization', `Bearer ${validToken}`)
      .attach('images', `${__dirname}/1.sm.webp`)
      .field(updateProductWithLessImages);

    expect(response.statusCode).toBe(400);
  });

	test('should mark product ', async () => {
		const response = await request(app)
			.put(`/api/v1/products/${id}`)
			.set('Authorization', `Bearer ${validToken}`)
			.send({ isAvailable: false });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty(
			'message',
			'Product availability changed successfully'
		);
	});

	it('should return 500', async () => {
		const requestSpy = jest.spyOn(ProductService, 'updateProduct');
		requestSpy.mockRejectedValue(
			new Error('Error occured while updating for a product')
		);

		const res = await request(app)
			.patch(`/api/v1/products/${id}`)
			.set('Authorization', `Bearer ${validToken}`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.attach('images', `${__dirname}/1.sm.webp`)
			.field(updateProductWithChangedAllImages);

		expect(res.statusCode).toBe(500);
		requestSpy.mockRestore();
	});
	it('should return 500', async () => {
		const requestSpy = jest.spyOn(ProductService, 'updateProduct');
		requestSpy.mockRejectedValue(
			new Error('Error occured while marking product')
		);
	});
	test('should  validate uuid', async () => {
		const invalidId = '234565434543456';
		const response = await request(app)
			.patch(`/api/v1/products/${invalidId}`)
			.set('Authorization', `Bearer ${validToken}`)
			.send(validProduct);

		expect(response.statusCode).toBe(400);
	});
	it('should return 500', async () => {
		const requestSpy = jest.spyOn(ProductService, 'deleteProduct');
		requestSpy.mockRejectedValue(
			new Error('Error occured while deleting product')
		);

		const res = await request(app)
			.delete(`/api/v1/products/${id}`)
			.set('Authorization', `Bearer ${validToken}`);
		expect(res.statusCode).toBe(500);
		requestSpy.mockRestore();
	});

	test('should delete product', async () => {
		const response = await request(app)
			.delete(`/api/v1/products/${id}`)
			.set('Authorization', `Bearer ${validToken}`);

		expect(response.statusCode).toBe(200);
	});
});
