import responses from './responses.js';

const getOrder = {
    tags: ['Orders'],
    summary: 'Get Order ',
    description: ' Order information',
    parameters: [
        {
            name: 'orderId',
            in: 'path',
            description: 'order id',
            schema: {
                type: 'string',
                format: 'uuid',
            },
        },
    ],
    responses,
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const getAllOrders = {
    tags: ['Orders'],
    summary: 'Get all orders',
    description: 'Listing all orders',
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
    ],
    consumes: ['application/json'],
    responses,
    security: [
      {
        bearerAuth: [],
      },
    ],
  };

const orders = {
	'/api/v1/orders/': {
		get: getAllOrders,
    },
	
    '/api/v1/orders/{orderId}': {
		get: getOrder
	},
};

export default orders;
