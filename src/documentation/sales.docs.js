import responses from './responses.js';
const getSales = {
    tags: ['Sales'],
    summary: 'Get all seller sales',
    description: 'Listing all seller sales',
    responses,
    security: [
        {
            bearerAuth: [],
        },
    ],
};
const getOrderSales = {
    tags: ['Sales'],
    summary: 'Get all Order sales',
    description: 'Listing all Order sales',
    parameters: [
        {
            name: 'orderId',
            in: 'path',
            description: 'Order id',
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
const getSale = {
    tags: ['Sales'],
    summary: 'Get single sale',
    description: 'Listing all single sale',
    parameters: [
        {
            name: 'saleId',
            in: 'path',
            description: 'Sale id',
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

const sales = {
	'/api/v1/sales/': {
		get: getSales,
    },
	'/api/v1/sales/{orderId}/orderSales': {
		get: getOrderSales
	},
    '/api/v1/sales/{saleId}': {
		get: getSale
	},
};

export default sales;
