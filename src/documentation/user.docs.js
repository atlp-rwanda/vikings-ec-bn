import responses from './responses';
const getAllUsers = {
    tags:['Users'],
    summary:'List of all the users',
    description:'Get all of the users',
    responses:{
      200:{
        description: 'OK',
      },
      500: {
        description: 'Internal Server Error'
      }
    },
    security: [{
        bearerAuth: []
      }]
  };

const forgetPassword = {
    tags: ['Users'],
    summary: 'forget password',
    description: 'user get email to reset password',
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
            },
            example: {
              email: 'verify@gmail.com',
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

const resetPassword = {
      tags: ['Users'],
      summary: 'reset password',
      description: 'user use email to reset password',
      parameters:[
          {
              name:'token',
              in:'path',
              description:'Token',
              schema:{
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
                newPassword: {
                  type: 'string',
                  required: true,
                },
              },
              example: {
                newPassword: 'verify@gmail.com',
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

    const updateRole = {
      tags: ['Users'],
      summary: 'Update Role',
      description: 'Updating role endpoint',
      parameters:[
          {
              name:'userId',
              in:'path',
              description:'User Id',
              schema:{
                  type: 'string',
                  format:'uuid',
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
                role: 'seller',
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
      security: [{
          bearerAuth: []
        }]
      };

const updatePassword = {
  tags: ['Users'],
  summary: 'Update password',
  description: 'Updating the password of a user',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            old_password: {
              type: 'string',
              required: true,
            },
            new_password:{
              type: 'string',
              required: true,
            }
          },
          example: {
            old_password: 'Pass@123',
            new_password: '@Test123'
          },
        },
      },
    },
  },
  responses,
  security: [{
      bearerAuth: []
    }]
};

const disableAccount = {
  tags: ['Users'],
  summary: 'Change account status',
  description: 'Updating status of a user',
  parameters:[
      {
          name:'userId',
          in:'path',
          description:'User Id',
          schema:{
              type: 'string',
              format:'uuid',
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
            isActive: {
              type: 'boolean',
              required: true,
            },
          },
          example: {
            isActive: false,
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
  security: [{
      bearerAuth: []
    }]
  };

const userRouteDocs = {
  '/api/v1/users': {
      get: getAllUsers,
    },

  '/api/v1/users/forgot-password': {
      post: forgetPassword,
    },

    '/api/v1/users/reset-password/{token}': {
      patch: resetPassword,
    },

  '/api/v1/users/{userId}': {
    patch: updateRole,
    put: disableAccount,
  },
  '/api/v1/users/update-password':{
    patch: updatePassword,
  }
};

export default userRouteDocs;
