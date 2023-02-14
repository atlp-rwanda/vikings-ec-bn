const login = {
    tags: ['Users'],
    description: 'Login with email and password',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            required: true,
                        },
                        password: {
                            type: 'string',
                            required: true,
                        },
                    },
                },
                example: {
                    email: 'verified@gmail.com',
                    password: 'Pass@123',
                },
            },
        },
    },
    responses: {
        200: {
            description: 'OK',
        },
        404: {
            description: 'NOTFOUND',
        },
    },
};

const google = {
    tags: ['Users'],
    summary: 'Get redirected by google',
    description: 'Login and authenticate with google',
    security: [
        {
            google_auth: [],
        },
    ],
    responses: {
        200: {
            description: 'OK',
            content: {
                'application/json': {},
            },
        },
    },
};

const register = {
    tags: ['Users'],
    description: 'User Registration',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        firstname: {
                            type: 'string',
                            required: true,
                        },
                        lastname: {
                            type: 'string',
                            required: true,
                        },
                        email: {
                            type: 'string',
                            required: true,
                        },
                        phone: {
                            type: 'string',
                            required: true,
                        },
                        password: {
                            type: 'string',
                            required: true,
                        },
                    },
                    example: {
                        firstname: 'NameOne',
                        lastname: 'NameTwo',
                        email: 'example@gmail.com',
                        phone: '0987654321',
                        password: '@Test123',
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: 'REGISTERED',
        },
        400: {
            description: 'VALIDATION ERROR',
        },
        409: {
            description: 'USER ALREADY EXISTS',
        },
        500: {
            description: 'INTERNAL SERVER ERROR',
        },
    },
};
const logout = {
    tags: ['Users'],
    description: 'Invalidating jwt token',
    responses: {
        200: {
            description: 'OK',
        },
        404: {
            description: 'NOT FOUND',
        },
        500: {
            description: 'INTERNAL SERVER ERROR',
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const authenticationRouteDocs = {
    '/api/v1/users/login': {
        post: login,
    },
    '/api/v1/users/register': {
        post: register,
    },
    '/api/v1/users/logout': {
        post: logout,
    },
    '/api/v1/users/redirect': {
        get: google,
    },
};

export default authenticationRouteDocs;
