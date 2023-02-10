const login = {
    tags: ['Login'],
    description: 'authentication message',
    responses: {
        200: {
            description: 'OK',
        },
        404: {
            description: 'NOTFOUND',
        },
    },
};

const register = {
    tags: ['Register'],
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
            description: 'Registered',
        },
        400: {
            description: 'Validation Error',
        },
        409: {
            description: 'User Already Exists',
        },
        500: {
            description: 'Internal Server Error',
        },
    },
};
const logout = {
    tags: ['Logout'],
    description: 'Invalidating jwt token',
    // parameters: [{
    //     "name": "Authorization",
    //     "in": "header",
    //     "type": "string",
    //     "required": true,
    // }],
    responses: {
        200: {
            description: 'OK',
        },
        404: {
            description: 'NOT FOUND',
        },
        500: {
            description: "INTERNA SERVER ERROR"
        }
    },
    security: [{
        bearerAuth: [],
    }, ],
}

const authenticationRouteDocs = {
    '/api/v1/users/login': {
        post: login,
    },
    '/api/v1/users/register': {
        post: register,
    },
    '/api/v1/users/logout': {
        post: logout,
    }
};

export default authenticationRouteDocs;