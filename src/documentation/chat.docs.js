import responses from './responses.js';

const chat = {
  '/api/v1/chats': {
    post: {
      tags: ['Chats'],
      summary: 'Public Chat',
      description: 'Users can chat on the platform',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  required: true,
                },
              },
              example: {
                message: 'Test message',
              },
            },
          },
        },
      },
      consumes: ['application/json'],
      responses,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    get: {
      tags: ['Chats'],
      summary: 'Public Chat',
      description: 'Users can chat on the platform',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: 'limit for chat messages',
          required: true,
          schema: {
            type: 'integer',
          },
        },
        {
          name: 'offset',
          in: 'query',
          description: 'Offset for chat messages',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
};

export default chat;
