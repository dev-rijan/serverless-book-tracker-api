import * as chai from "chai";

import { validateRequest, createChunks } from "../../../src/utils/util";

const expect = chai.expect;

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
      validateRequest(mockData, constraints)
        .then(() => {
          expect(true).to.eql(true);
        })
        .catch(() => {
          expect(true).to.eql(false);
        });
    });
    it("should return a response containing validation errors if the data provided is incorrect", (done) => {
      // @ts-ignore
      mockData.name = 123;
      validateRequest(mockData, constraints)
        .then(() => {
          expect(true).to.eql(false);
          done();
        })
        .catch(() => {
          expect(true).to.eql(true);
          done();
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

    it("should return array of chunks", function () {
      const chunks = createChunks(mockData, chunkSize);
      expect(chunks.length).to.eql(dataCount / chunkSize);
    });
  });
});
