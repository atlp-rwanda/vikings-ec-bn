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

const updateRole = {
  tags: ['Users'],
  summary: 'Update Role',
  description: 'Updating role endpoint',
  parameters:[
      {
          name:'id',
          in:'path',
          description:'User Id',
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

  const forgotPassword = {
    tags:['Users'],
    summary:'send email to user',
    description:'Send email to reset password',
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
              },
              example: {
                  email: 'verified@gmail.com',
              },
          },
      },
  },
    responses:{
      200:{
        description: 'OK',
      },
      500: {
        description: 'Internal Server Error'
      }
    },
  };
  
  
  
  const resetPassword = {
    tags:['Users'],
    summary:'reset the password',
    description:'Reset password through the email',
    parameters:[
      {
          name:'token',
          in:'path',
          description:'reset token',
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
                      password: {
                          type: 'string',
                          required: true,
                      },
                  },
              },
              example: {
                  newPassword: 'Sracerolif@123',
              },
          },
      },
  },
    responses:{
      200:{
        description: 'OK',
      },
      500: {
        description: 'Internal Server Error'
      }
    },
  };

const disableAccount = {
tags: ['Users'],
summary: 'Disable account',
description: 'Updating status of a user',
parameters:[
    {
        name:'id',
        in:'path',
        description:'User Id',
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
          isActive: {
            type: 'string',
            required: true,
          },
        },
        example: {
          isActive: 'disactive',
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

'/api/v1/users/{id}': {
  patch: updateRole,
  put: disableAccount,
},

'/api/v1/users/reset': {
  post: forgotPassword,
},
'/api/v1/users/reset-password/{token}': {
  patch: resetPassword,
},
};

export default userRouteDocs;