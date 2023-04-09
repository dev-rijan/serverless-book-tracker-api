import * as chai from "chai";

import ResponseModel, {
  STATUS_MESSAGES,
} from "../../../src/models/response.model";

const responseMock = require("../../mocks/response.mock.json");

const expect = chai.expect;

describe("Model/Response.model", () => {
  describe("Ensure setting and getting of variables", () => {
    const responseModel = new ResponseModel(
      responseMock.data,
      responseMock.code
    );

    it("should set the status code correctly", () => {
      expect(responseModel.code).to.eql(responseMock.code);
    });

    it("should set the message correctly", () => {
      responseModel.setBodyVariable("message", responseMock.message);
      expect(responseModel.message).to.eql(responseMock.message);
    });
  });

  describe("Ensure entity mapping", () => {
    const responseModel = new ResponseModel(
      responseMock.data,
      responseMock.code,
      responseMock.message
    );

    it("should generate a response object", () => {
      expect(responseModel.generate()).to.eql({
        statusCode: responseMock.code,
        headers: responseMock.headers,
        body: JSON.stringify({
          data: responseMock.data,
          message: responseMock.message,
          status: STATUS_MESSAGES[responseMock.code],
        }),
      });
    });
  });
});
