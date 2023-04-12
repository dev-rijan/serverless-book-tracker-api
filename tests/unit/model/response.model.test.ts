import ResponseModel, {
  STATUS_MESSAGES,
} from '../../../src/models/response.model'

// eslint-disable-next-line
const responseMock = require('../../mocks/response.mock.json')

describe('Model/Response.model', () => {
  describe('Ensure setting and getting of variables', () => {
    const responseModel = new ResponseModel(
      responseMock.data,
      responseMock.code
    )

    it('should set the status code correctly', () => {
      expect(responseModel.code).toEqual(responseMock.code)
    })

    it('should set the message correctly', () => {
      responseModel.setBodyVariable('message', responseMock.message)
      expect(responseModel.message).toEqual(responseMock.message)
    })
  })

  describe('Ensure entity mapping', () => {
    const responseModel = new ResponseModel(
      responseMock.data,
      responseMock.code,
      responseMock.message
    )

    it('should generate a response object', () => {
      expect(responseModel.generate()).toEqual({
        statusCode: responseMock.code,
        headers: responseMock.headers,
        body: JSON.stringify({
          data: responseMock.data,
          message: responseMock.message,
          status: STATUS_MESSAGES[responseMock.code],
        }),
      })
    })
  })
})
