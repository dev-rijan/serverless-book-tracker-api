import "source-map-support/register";

import BookModel, { IBookInterface } from "../../models/book.model";
import ResponseModel from "../../models/response.model";

import DatabaseService, { PutItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";

import requestConstraints from "../../constraints/book/create.constraint.json";
import { wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const createBookHandler = async (
  body: IBookInterface
): Promise<ResponseModel> => {
  try {
    await validateRequest(body, requestConstraints);
    const databaseService = new DatabaseService();

    const bookModel = new BookModel(body);
    const data = bookModel.toEntityMappings();
    const params: PutItem = {
      TableName: databaseTables().bookTable,
      Item: {
        id: data.id,
        name: data.name,
        createdAt: data.timestamp,
        updatedAt: data.timestamp,
      },
    };
    await databaseService.create(params);
    return new ResponseModel(
      { bookId: data.id },
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
