import responses from './responses.js';

const profile = {
    '/api/v1/users/profile': {
        put: {
            tags: ['Users'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            summary: 'Updating profile',
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                avatar: {
                                    type: 'string',
                                    format: 'binary',
                                    description: 'The image file',
                                },
                                firstname: {
                                    type: 'string',
                                    description: 'The user\'s first name',
                                },
                                description: {
                                    type: 'string',
                                    description: 'The user\'s description',
                                },
                                birthdate: {
                                    type: 'string',
                                    format: 'date',
                                    description: 'The user\'s birthdate',
                                    default:'2022-04-29',
                                },
                                lastname: {
                                    type: 'string',
                                    description: 'The user\'s last name',
                                },
                                phone: {
                                    type: 'string',
                                    description: 'The user\'s phone',
                                },
                                billingAddress: {
                                    type: 'object',
                                    properties: {
                                        streetAddress: {
                                            type: 'string',
                                            description: 'The user\'s street address'
                                        },
                                        city: {
                                            type: 'string',
                                            description: 'The user\'s city'
                                        },
                                        state: {
                                            type: 'string',
                                            description: 'The user\'s state'
                                        },
                                        zipCode: {
                                            type: 'string',
                                            description: 'The user\'s zip code'
                                        },
                                        country: {
                                            type: 'string',
                                            description: 'The user\'s Country'
                                        },
                                    },
                                    description: 'The user\'s billing address'
                                },


                            },
                        },
                    },
                },
            },
            consumes: ['application/json'],
            responses,
        },
        get: {
            tags: ['Users'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            summary: 'Get profile',
            parameters: [],
            consumes: ['application/json'],
            responses,
        },

    },


};

export default profile;
