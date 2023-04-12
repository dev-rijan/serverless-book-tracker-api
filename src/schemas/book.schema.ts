import { JSONSchemaType } from 'ajv'
import { IBookInterface } from '../models/book.model'
import { QueryParams } from 'src/utils/lambda-handler'

export const BookSchema: JSONSchemaType<IBookInterface> = {
  type: 'object',
  properties: {
    id: { type: 'string', nullable: true },
    title: { type: 'string' },
    author: { type: 'string' },
    readAt: { type: 'string', nullable: true },
  },
  required: ['title', 'author'],
  additionalProperties: false,
}

export const BookQuerySchema: JSONSchemaType<QueryParams> = {
  type: 'object',
  properties: {
    bookId: { type: 'string' },
  },
  required: ['bookId'],
  additionalProperties: false,
}
