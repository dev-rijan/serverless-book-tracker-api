import handler from "../../../lib/actions/handler";

const requestData = {
  title: "book title",
  author: "book author",
  readAt: "2023-04-10",
};

describe("GET /book - Retrieve book from the DB", () => {
  let getBookResponse, statusCode, bookId;

  // Before running the tests, send a request to the endpoint.
  beforeAll(async () => {
    try {
      const body = await handler.createBook(requestData);
      bookId = body.data.data.book.id;
      getBookResponse = await handler.getBook(bookId);
      statusCode = 200;
    } catch (error) {
      statusCode = error.response.status;
      getBookResponse = error.response.data;
    }
  });

  it("should expect a 200 status code", () => {
    expect(statusCode).toEqual(200);
  });

  it("should expect a success message", () => {
    expect(getBookResponse.message).toEqual("Book successfully retrieved");
  });

  it("should expect a book properties", () => {
    expect(getBookResponse.data.book.title).toEqual(requestData.title);
    expect(getBookResponse.data.book.id).toEqual(bookId);
    expect(getBookResponse.data.book.author).toEqual(requestData.author);
  });
});
