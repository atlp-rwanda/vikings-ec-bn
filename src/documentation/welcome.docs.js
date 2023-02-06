const getWelcome = {
  tags: ['Welcome'],
  description: 'Welcome message',
  responses: {
    200: {
      description: 'OK',
    },
    404: {
      description: 'NOTFOUND',
    },
  },
};

const welcomeRouteDocs = {
  '/api/v1/': {
    get: getWelcome,
  },
};

export default welcomeRouteDocs;
