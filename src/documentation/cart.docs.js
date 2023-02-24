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
              required: false
            }
          },
          example: {
            productId: '6717e8c7-c058-4670-90c3-5c8953cc844a',
            productQuantity: 3
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
    }
};

export default cartRouteDocs;
