import BookModel from "../../../src/models/book.model";
const bookMock = require("../../mocks/task.mock.json");

describe("Model/Book.model", () => {
  describe("Ensure entity mapping", () => {
    it("should return an object with all of the entity values", () => {
      const bookModel = new BookModel(bookMock);

      expect(bookModel.toEntityMappings()).toEqual({
        id: bookMock.id,
        title: bookMock.title,
        author: bookMock.author,
        readAt: bookMock.readAt,
      });
    });
  });

  describe("Ensure entity hydration", () => {
    it("should be able to get book the hydrated variables from the model", () => {
      const bookModel = new BookModel(bookMock);

      expect(bookModel.id).toEqual(bookMock.id);
      expect(bookModel.title).toEqual(bookMock.title);
      expect(bookModel.author).toEqual(bookMock.author);
    });
  });
});
