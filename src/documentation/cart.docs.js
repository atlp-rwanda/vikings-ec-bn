import responses from './responses.js';

const addToCart = {
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
};

const viewCart = {
	tags: ['Products', 'Cart'],
	summary: 'Get cart',
	description: 'Listing cart details (total & products in the cart)',
	responses,
	security: [
		{
			bearerAuth: [],
		},
	],
};

const clearCart = {
	tags: ['Products', 'Cart'],
	summary: 'Clear cart',
	description: 'Remove all products from the cart and reset total to 0',
	responses,
	security: [
		{
			bearerAuth: [],
		},
	],
};

const updateCart = {
	tags: ['Products', 'Cart'],
	summary: 'Update cart',
	description: 'Update cart contents',
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
						productQuantity: 2,
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
};
const cartRouteDocs = {
	'/api/v1/cart/add-to-cart': {
		post: addToCart,
	},
	'/api/v1/cart/view-cart': {
		get: viewCart,
	},
	'/api/v1/cart/clear-cart': {
		post: clearCart,
	},
  '/api/v1/cart/update-cart': {
    patch: updateCart,
  }
};

export default cartRouteDocs;
