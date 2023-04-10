import handler from "../../../lib/actions/handler";

const requestData = {
  bookId: null,
  comment: "Nice book",
};

describe("POST /comment - Valid comment created in DB", () => {
  let response, bookId: string;

  // Before running the tests, send a request to the endpoint.
  beforeAll(async () => {
    jest.setTimeout(10000);

    try {
      const body = await handler.createBook({
        title: "Book title",
        author: "book author",
      });

      bookId = body.data.data.book.id;

      const commentBody = await handler.createComment({
        ...requestData,
        bookId,
      });
      response = commentBody;
    } catch (error) {
      response = error.response.body;
    }
  });

  it("should expect a 200 status code", () => {
    console.log(response);
    expect(response.status).toEqual(200);
  });

  it("should expect a success message", () => {
    expect(response.data.message).toEqual("Comment successfully added");
  });

  it("should return comment with book", async () => {
    try {
      const results = await handler.getBook(response.data.bookId);
      console.log(results);
    } catch (error) {
      expect(true).toEqual(false);
    }
  }, 1000);
});
