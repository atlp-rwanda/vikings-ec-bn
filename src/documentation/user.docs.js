
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
  
  const userRouteDocs = {
    '/api/v1/users': {
        get: getAllUsers,
      },
    
    '/api/v1/users/{id}': {
      patch: updateRole,
    },
  };
  
  export default userRouteDocs;
  