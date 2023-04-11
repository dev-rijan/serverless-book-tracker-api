export default {
  createBook: {
    handler: "handler.createBook",
    events: [
      {
        http: {
          method: "POST",
          path: "book",
          cors: true,
          throttling: {
            maxRequestsPerSecond: 2,
            maxConcurrentRequests: 1,
          },
        },
      },
    ],
  },
  deleteBook: {
    handler: "handler.deleteBook",
    events: [
      {
        http: {
          method: "DELETE",
          path: "book",
          cors: true,
        },
      },
    ],
  },
  getBook: {
    handler: "handler.getBook",
    events: [
      {
        http: {
          method: "GET",
          path: "book",
          cors: true,
        },
      },
    ],
  },
  getAllBooks: {
    handler: "handler.getAllBooks",
    events: [
      {
        http: {
          method: "GET",
          path: "books",
          cors: true,
        },
      },
    ],
  },
  createComment: {
    handler: "handler.createComment",
    events: [
      {
        http: {
          method: "POST",
          path: "comment",
          cors: true,
        },
      },
    ],
  },
  handleApiGatewayLog: {
    handler: "ops-handler.handleApiGatewayLog",
    events: [
      {
        subscriptionFilter: {
          stage: "${self:custom.stage}",
          logGroupName: "/aws/api-gateway/${self:service}-${self:custom.stage}",
          filterPattern:
            '{$.status = "429" || $.status = "502" || $.status = "504"}',
        },
      } as any,
    ],
  },
};
