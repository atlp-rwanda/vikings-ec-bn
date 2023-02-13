const basicInfo = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    description: 'Ecommerce api docs',
    version: '1.0.0',
  },

  schemes: ['HTTP', 'HTTPS'],

  security: [
    {
      google_auth: [],
    },
  ],

  components: {
    securitySchemes: {
      google_auth: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl:
              'http://localhost:5000/api/v1/users/auth/google/redirect',
          },
        },
      },

      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default basicInfo;
