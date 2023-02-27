import responses from './responses.js';

const carts = {
	'/api/v1/carts': {
		post: {
			tags: ['Products', 'Cart'],
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
			tags: ['Products', 'Cart'],
			summary: 'Get cart',
			description: 'Listing cart details (total & products in the cart)',
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
