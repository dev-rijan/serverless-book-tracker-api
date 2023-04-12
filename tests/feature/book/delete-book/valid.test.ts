import handler from '../../../lib/actions/handler'

const requestData = {
  title: 'book title',
  author: 'book author',
  readAt: '2023-04-10',
}

describe('DELETE /book - Delete book in DB', () => {
  let response, bookId
  // Before running the tests, send a request to the endpoint.
  beforeAll(async () => {
    try {
      const body = await handler.createBook(requestData)
      bookId = body.data.data.book.id
      const deleteBody = await handler.deleteBook({ bookId })
      response = deleteBody
    } catch (error) {
      response = error.response.body
    }
  })

  it('should expect a 204 status code', () => {
    expect(response.status).toEqual(204)
  })

  it('should check that book has been deleted', async () => {
    try {
      await handler.getBook(bookId)
      throw new Error('Book still exists!')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
