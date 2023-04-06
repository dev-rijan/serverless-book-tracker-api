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
  updateBook: {
    handler: "handler.updateBook",
    events: [
      {
        http: {
          method: "PUT",
          path: "book",
          cors: true,
        },
      },
    ],
  },
  createTask: {
    handler: "handler.createTask",
    events: [
      {
        http: {
          method: "POST",
          path: "task",
          cors: true,
        },
      },
    ],
  },
  deleteTask: {
    handler: "handler.deleteTask",
    events: [
      {
        http: {
          method: "DELETE",
          path: "task",
          cors: true,
        },
      },
    ],
  },
  getTask: {
    handler: "handler.getTask",
    events: [
      {
        http: {
          method: "GET",
          path: "task",
          cors: true,
        },
      },
    ],
  },
  updateTask: {
    handler: "handler.updateTask",
    events: [
      {
        http: {
          method: "PUT",
          path: "task",
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
