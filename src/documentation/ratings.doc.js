import responses from './responses';

const productRating ={
    tags: ['Ratings'],
          security: [
            {
              bearerAuth: [],
            },
          ],
          summary: 'Product ratings and feedback',
          description: 'Rate endpoint',
          parameters: [
            {
              name: 'productId',
              in: 'path',
              description: 'productId',
              schema: {
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
                    rate: 4,
                    feedback:'Thank you',
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

    const rateDocs = {
        '/api/v1/ratings/{productId}': {
            post: productRating,
          },
    };
    export default rateDocs;