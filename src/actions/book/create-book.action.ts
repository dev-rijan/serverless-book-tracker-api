import "source-map-support/register";

import BookModel, { IBookInterface } from "../../models/book.model";
import ResponseModel from "../../models/response.model";

import DatabaseService, { PutItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";

import { BookSchema } from "../../schemas/book.schema";
import { wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const createBookHandler = async (
  body: IBookInterface
): Promise<ResponseModel> => {
  try {
    await validateRequest(body, BookSchema);
    const databaseService = new DatabaseService();

    const bookModel = new BookModel(body);
    const data = bookModel.toEntityMappings();
    const params: PutItem = {
      TableName: databaseTables().bookTable,
      Item: {
        id: data.id,
        title: data.title,
        author: data.author,
        readAt: data.readAt,
      },
    };
    await databaseService.create(params);
    return new ResponseModel(
      { book: data },
      StatusCode.CREATED,
      ResponseMessage.CREATE_BOOK_SUCCESS
    );
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel(
          {},
          StatusCode.ERROR,
          ResponseMessage.CREATE_BOOK_FAIL
        );
  }
};

export const createBook = wrapAsRequest(createBookHandler);
