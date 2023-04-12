import 'source-map-support/register'

import ResponseModel from '../../models/response.model'
import DatabaseService, {
  DeleteItem,
  QueryItem,
} from '../../services/database.service'
import { createChunks, databaseTables, validateRequest } from '../../utils/util'
import { BookQuerySchema } from '../../schemas/book.schema'
import { QueryParams, wrapAsRequest } from '../../utils/lambda-handler'
import { StatusCode } from '../../enums/status-code.enum'
import { ResponseMessage } from '../../enums/response-message.enum'

const deleteBookHandler = async (
  _body: never,
  queryParams: QueryParams
): Promise<ResponseModel> => {
  const { bookTable, commentsTable } = databaseTables()
  const databaseService = new DatabaseService()

  try {
    await validateRequest(queryParams, BookQuerySchema)
    const { bookId } = queryParams

    // check book exists
    const existsItem = await databaseService.existsItem({
      key: bookId!,
      tableName: bookTable,
    })

    if (!existsItem) {
      return new ResponseModel(
        {},
        StatusCode.NOT_FOUND,
        ResponseMessage.DELETE_BOOK_NOTFOUND
      )
    }

    const params: DeleteItem = {
      TableName: bookTable,
      Key: { id: bookId },
    }

    await databaseService.delete(params) // Delete book

    const commentParams: QueryItem = {
      TableName: commentsTable,
      IndexName: 'book_index',
      KeyConditionExpression: 'bookId = :bookIdVal',
      ExpressionAttributeValues: {
        ':bookIdVal': bookId,
      },
    }

    const results = await databaseService.query(commentParams)

    if (results?.Items && results?.Items.length) {
      const commentEntities = results?.Items?.map((item) => {
        return { DeleteRequest: { Key: { id: item.id, bookId: item.bookId } } }
      })

      if (commentEntities.length > 25) {
        const commentChunks = createChunks(commentEntities, 25)
        await Promise.all(
          commentChunks.map((comments) => {
            return databaseService.batchCreate({
              RequestItems: {
                [commentsTable]: comments,
              },
            })
          })
        )
      } else {
        await databaseService.batchCreate({
          RequestItems: {
            [commentsTable]: commentEntities,
          },
        })
      }
    }
    return new ResponseModel(
      {},
      StatusCode.NO_CONTENT,
      ResponseMessage.DELETE_BOOK_SUCCESS
    )
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel(
          {},
          StatusCode.ERROR,
          ResponseMessage.DELETE_BOOK_FAIL
        )
  }
}

export const deleteBook = wrapAsRequest(deleteBookHandler)
