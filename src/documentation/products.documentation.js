import responses from './responses';

const category = {
  tags: ['Products'],
  summary: 'Create category',
  description: 'Creating a product category',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              required: true,
            },
          },
          example: {
            category: 'clothing',
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

const productDocs = {
  '/api/v1/category': {
    post: category,
  },
  '/api/v1/products': {
    post: {
      tags: ['Products'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Creating product',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Product name',
                  required: true,
                },
                price: {
                  type: 'number',
                  description: 'Price of product',
                },
                category: {
                  type: 'string',
                  description: 'Product category',
                },
                expiryDate: {
                  type: 'string',
                  format: 'date',
                  description: 'Expired date of product',
                  default: '2023-04-29',
                },
                bonus: {
                  type: 'number',
                  description: 'Bonus for a product',
                },
                images: {
                  type: 'array',
                  items: {
                    minItems: 4,
                    type: 'file',
                  },
                },
              },
            },
          },
        },
      },
      consumes: ['application/json'],
      responses,
    },
  },
};
export default productDocs;
