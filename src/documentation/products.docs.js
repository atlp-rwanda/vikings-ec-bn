import responses from './responses.js';

const category = {
  tags: ['Categories'],
  summary: 'Create category',
  description: 'Creating a product category',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              required: true,
            },
          },
          example: {
            name: 'clothing',
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

const getAllProducts = {
  tags: ['Products'],
  summary: 'Get products',
  description: 'Listing all products',
  parameters: [
    {
      name: 'limit',
      in: 'query',
      description: 'The number of items to be displayed',
      required: false,
      schema: {
        type: 'integer',
        minimum: 1
      }
    },    {
      name: 'page',
      in: 'query',
      description: 'The page number to retrieve',
      required: false,
      schema: {
        type: 'string',
        minimum: 1
      }
    }],
  consumes: ['application/json'],
  responses,
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const createProduct={
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
            categoryId: {
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
};

const removeExpiredProducts = {
  tags: ['Products'],
  summary: 'Removing expired product',
  description: 'Mark Product as expired and unavailable',
  parameters: [
    {
      name: 'productId',
      in: 'path',
      description: 'Product Id',
      required: true,
      schema: {
        type: 'string',
      }
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            isExpired: {
              type: 'Boolean',
              required: true,
            },
            isAvailable: {
              type: 'Boolean',
              required: true,
            },
          },
          example: {
            isExpired: 'true',
            isAvailable: 'False',
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
  '/api/v1/categories': {
    post: category,
  },
  '/api/v1/products': {
    post: createProduct,
    get: getAllProducts
  },
  '/api/v1/products/{productId}/expired': {
    patch: removeExpiredProducts,
  }
};
export default productDocs;
