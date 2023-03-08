
import responses from './responses';

const productRating = {
  tags: ['Ratings'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: 'Product ratings and feedback',
  description: 'Rate endpoint',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            role: {
              type: 'string',
              required: true,
            },
          },
          example: {
            rate: 4,
            feedback: 'Thank you',
            productId: '6717e8c7-c058-4670-90c3-5c8953cc844a'
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
};
const getRatings = {
  tags: ['Ratings'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: 'Get ratings and feedback',
  description: 'Rate endpoint',
  parameters: [
    {
      name: 'productId',
      in: 'path',
      description: 'product Id',
      schema: {
        type: 'string',
      }
    },
  ],
  responses: {
    200: {
      description: 'OK',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
};

const rateDocs = {
  '/api/v1/ratings': {
    post: productRating,
  },
  '/api/v1/products/{productId}/ratings': {
    get: getRatings,
  }
};
export default rateDocs;