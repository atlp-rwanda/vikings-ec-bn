import responses from './responses.js';

const carts = {
	'/api/v1/carts': {
		post: {
			tags: ['Cart'],
			summary: 'Add to cart',
			description: 'User can add a product to their cart',
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								productId: {
									type: 'string',
									required: true,
								},
								productQuantity: {
									type: 'number',
									required: false,
								},
							},
							example: {
								productId: '6717e8c7-c058-4670-90c3-5c8953cc844a',
								productQuantity: 3,
							},
						},
					},
				},
			},
			consumes: ['application/json'],
			responses,
			security: [
				{
					bearerAuth: [],
				},
			],
		},
		get: {
			tags: ['Cart'],
			summary: 'Get cart',
			description: 'Listing cart details (total & products in the cart)',
			responses,
			security: [
				{
					bearerAuth: [],
				},
			],
		},
		put: {
			tags: ['Cart'],
			summary: 'Clear cart',
			description: 'Remove all products from the cart and reset total to 0',
			responses,
			security: [
				{
					bearerAuth: [],
				},
			],
		},
	},
	'/api/v1/carts/{productId}': {
		patch: {
			tags: ['Cart'],
			summary: 'Remove from cart',
			description: 'User can remove a product from their cart',
			parameters: [
				{
					name: 'productId',
					in: 'path',
					description: 'Product id',
					schema: {
						type: 'string',
						format: 'uuid',
					},
				},
			],
			consumes: ['application/json'],
			responses,
			security: [
				{
					bearerAuth: [],
				},
			],
		},
	},
};

export default carts;
