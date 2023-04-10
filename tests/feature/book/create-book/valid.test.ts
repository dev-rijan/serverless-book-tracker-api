import handler from "../../../lib/actions/handler";

const requestData = {
  title: "book title",
  author: "book author",
};

describe("POST /book - Create book", () => {
  let response;

  // Before running the tests, send a request to the endpoint.
  beforeAll(async () => {
    try {
      response = await handler.createBook(requestData);
    } catch (error) {
      response = error.response;
    }
  });

  it("should expect a 201 status code", () => {
    expect(response.status).toEqual(201);
  });

  it("should expect a success message", () => {
    expect(response.data.message).toEqual("Book successfully created");
  });

  it("should check that data exists in DynamoDB", async () => {
    expect.assertions(5);

    const bookId = response.data.data.book?.id;
    const {
      data: { book },
    } = await handler.getBook(bookId);

    expect(book.id).toEqual(bookId);
    expect(book.title).toEqual(requestData.title);
    expect(book.author).toEqual(requestData.author);
    expect(book.commentCount).toEqual(0);
    expect(book.comments.length).toEqual(0);
  }, 10000);
});
