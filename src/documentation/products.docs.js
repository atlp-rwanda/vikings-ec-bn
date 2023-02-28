import responses from './responses.js';

const getSingleProduct = {
  tags: ['Products'],
  summary: 'Get specific product',
  description: 'List a specific product',
  parameters: [
    {
      name: 'productId',
      in: 'path',
      description: 'Id of product specified',
      required: true,
      schema: {
        type: 'string',
        minimum: 1,
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
};

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
        minimum: 1,
      },
    },
    {
      name: 'page',
      in: 'query',
      description: 'The page number to retrieve',
      required: false,
      schema: {
        type: 'string',
        minimum: 1
      }
    },
    {
      name: 'name',
      in: 'query',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'category',
      in: 'query',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'expireDate',
      in: 'query',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'minPrice',
      in: 'query',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'maxPrice',
      in: 'query',
      schema: {
        type: 'string',
      },
    }
  ],
  consumes: ['application/json'],
  responses,
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const createProduct = {
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
    get: {
      tags: ['Products'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'List of all the products',
      description: 'Get all of the products',
      responses: {
        200: {
          description: 'OK',
        },
        500: {
          description: 'Internal Server Error'
        }
      },
    }
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
      },
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

const markProduct ={
tags: ['Products'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Mark product',
      description: 'Mark available endpoint',
      parameters: [
        {
          name: 'productId',
          in: 'path',
          description: 'productId',
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
                role: {
                  type: 'string',
                  required: true,
                },
              },
              example: {
                isAvailable: 'true'
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
const updateProduct = {
 tags: ['Products'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update Product',
      description: 'Update Product',
      produces: ['application/json'],
      parameters: [
        {
          name: 'productId',
          in: 'path',
          description: 'productId',
          schema: {
            type: 'string',
          },

        },
      ],

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
         }
       },
       consumes: ['application/json'],
            responses,
    };
    const deleteProduct = {
      tags: ['Products'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Delete Product',
      description: 'Delete Product',
      produces: ['application/json'],
      parameters: [
        {
          name: 'productId',
          in: 'path',
          description: 'productId',
          schema: {
            type: 'string',
          },

        },
      ],

      responses: {
        200: {

          description: 'Ok',
        },

      },
    };
const productDocs = {
  '/api/v1/categories': {
    post: category,
  },
  '/api/v1/products': {
    post: createProduct,
    get: getAllProducts,
  },
  '/api/v1/products/{productId}/expired': {
    patch: removeExpiredProducts,
  },
    '/api/v1/products/{productId}': {
      get: getSingleProduct,
      put: markProduct,
      patch: updateProduct,
      delete: deleteProduct 
    },
};

  export default productDocs;
