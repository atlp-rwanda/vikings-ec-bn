import responses from "./responses.js";

const wishlist = {
  "/api/v1/wishlist/product-wishes": {
    post: {
      tags: ["Wishlist"],
      summary: "Add to wishlist",
      description: "User can add a product to their wishlist",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                productId: {
                  type: "string",
                  required: true,
                },
              },
              example: {
                productId: "6717e8c7-c058-4670-90c3-5c8953cc844a",
              },
            },
          },
        },
      },
      consumes: ["application/json"],
      responses,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  "/api/v1/wishlist/{productId}/product-wishes": {
    get: {
      tags: ["Wishlist"],
      summary: "get wishlist",
      description: "GET wishlist of any product",
      parameters: [
        {
          name: "productId",
          in: "path",
          description: "Product id",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    delete: {
      tags: ["Wishlist"],
      summary: "delete from wishlist",
      description: "DELETE product from wishlist",
      parameters: [
        {
          name: "productId",
          in: "path",
          description: "Product id",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },

  "/api/v1/users/{userId}/product-wishes": {
    get: {
      tags: ["Wishlist"],
      summary: "get wishlist",
      description: "GET wishlist of certain user",
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "User id",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
};

export default wishlist;
