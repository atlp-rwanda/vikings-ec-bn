import responses from "./responses.js";

const stats = {
  "/api/v1/stats/": {
    get: {
      tags: ["Statistics"],
      summary: "GET sales stats",
      description: "GET wishlist of any product",
      parameters: [
        {
          name: "start",
          in: "query",
          description: "Start date of the statistics range (YYYY-MM-DD)",
          schema: {
            type: "string",
            format: "date",
          },
        },
        {
          name: "end",
          in: "query",
          description: "end date of the statistics range (YYYY-MM-DD)",
          schema: {
            type: "string",
            format: "date",
          },
        },
        {
          name: "include",
          in: "query",
          description:
            "Comma-separated list of additional data to include in the statistics",
          schema: {
            type: "array",
            items: {
              type: "string",
              enum: ["expired", "sales", "wishes", "product-created"],
              required: false,
            },
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

export default stats;
