import handler from '../../../lib/actions/handler'

const requestData = {
  comment: 'Nice book',
}

describe('POST /comment - Invalid request', () => {
  let response, statusCode

  // Before running the tests, send a request to the endpoint.
  beforeAll(async () => {
    try {
      const data = await handler.createComment(requestData)
      response = data
    } catch (error) {
      statusCode = error.response.status
      response = error.response.data
    }
  })

  it('should expect a 400 status code', () => {
    expect(statusCode).toEqual(400)
  })

  it('should expect response status to show that validation has failed', () => {
    expect(response.message).toEqual('required fields are missing')
  })

  it('Expect validation errors to be listed', () => {
    const validationErrors = response.data.errors
    expect(validationErrors[0]?.message).toEqual(
      "must have required property 'bookId'"
    )
  })
})
