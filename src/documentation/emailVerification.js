const confirmEmail = {
    tags: ['Users'],
    description: 'Confirm your email',
    parameters: [{
        name: 'token',
        in: 'path',
        description: 'Email verification token',
        required: true,
        type: 'string'
    }],
    responses: {
      201: {
        description: 'OK',
      },
      500: {
        description: 'Something went wrong',
      },
    },
  };
  
  const confirmEmailRoute = {
    '/api/v1/users/verify-email/{token}': {
      get: confirmEmail,
    },
  };
  
  export default confirmEmailRoute;