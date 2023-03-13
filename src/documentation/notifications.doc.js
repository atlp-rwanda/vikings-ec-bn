import responses from './responses.js';

const notifications = {
  '/api/v1/notifications': {
    get: {
      tags: ['Notifications'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Get User notifications',
      parameters: [
        {
          name: 'limit',
          in: 'query',
          description: 'The number of items to be displayed',
          required: false,
          schema: {
            type: 'integer',
            minimum: 1,
          },
        },
        {
          name: 'page',
          in: 'query',
          description: 'The page number to retrieve',
          required: false,
          schema: {
            type: 'string',
            minimum: 1,
          },
        },
      ],
      responses,
    },
  },

  '/api/v1/notifications/{notificationId}': {
    patch: {
      tags: ['Notifications'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update User notifications',
      parameters: [
        {
          name: 'notificationId',
          in: 'path',
          description: 'Id of the notification to be updated',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },

  '/api/v1/notifications/': {
    patch: {
      tags: ['Notifications'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      summary: 'Update User notifications',
      responses,
    },
  },
};

export default notifications;
