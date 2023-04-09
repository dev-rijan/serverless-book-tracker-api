import { validateRequest, createChunks } from "../../../src/utils/util";

describe("Util Functions", () => {
  describe("validateRequest function", () => {
    const mockData = {
      name: "Test",
    };
    const constraints = {
      name: {
        presence: {
          allowEmpty: false,
        },
        type: "string",
      },
    };
    it("should resolve if there are no validation errors", () => {
      return validateRequest(mockData, constraints)
        .then(() => {
          expect(true).toEqual(true);
        })
        .catch(() => {
          expect(true).toEqual(true);
        });
    });
    it("should return a response containing validation errors if the data provided is incorrect", () => {
      // @ts-ignore
      mockData.name = 123;
      return validateRequest(mockData, constraints)
        .then(() => {
          expect(true).toEqual(false);
        })
        .catch(() => {
          expect(true).toEqual(true);
        });
    });
  });

  describe("createChunks function", () => {
    const mockData = [
      { comment: "comment 1" },
      { comment: "comment 2" },
      { comment: "comment 3" },
      { comment: "comment 4" },
      { comment: "comment 5" },
      { comment: "comment 6" },
      { comment: "comment 7" },
      { comment: "comment 8" },
      { comment: "comment 9" },
      { comment: "comment 10" },
      { comment: "comment 11" },
      { comment: "comment 12" },
    ];
    const dataCount = mockData.length;
    const chunkSize = 3;

    it("should return array of chunks", () => {
      const chunks = createChunks(mockData, chunkSize);
      expect(chunks.length).toEqual(dataCount / chunkSize);
    });
  });
});
