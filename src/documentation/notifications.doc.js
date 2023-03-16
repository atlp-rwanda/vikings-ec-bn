import responses from './responses.js';

const notifications = {
    '/api/v1/notifications': {
        get: {
            tags: ['Notifications'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            summary: 'Get User notifications',
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
        },

    },


};

export default notifications;
