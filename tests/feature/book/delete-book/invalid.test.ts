import handler from "../../../lib/actions/handler";

const requestData = {
  bookId: "468c8094-a756-4000-a919-example",
};

describe("POST /book - Invalid book delete request", () => {
  let response, statusCode;

  // Before running the tests, send a request to the endpoint.
  beforeAll(async () => {
    try {
      const data = await handler.deleteBook(requestData);
      response = data;
    } catch (error) {
      statusCode = error.response.status;
      response = error.response.data;
    }
  });

  it("should expect a 404 status code", () => {
    expect(statusCode).toEqual(404);
  });

  it("should expect a response message to describe the error", () => {
    expect(response.message).toEqual(
      "Book has already been deleted or invalid book id"
    );
  });

  it("should expect response status", () => {
    expect(response.status).toEqual("bad request");
  });
});
