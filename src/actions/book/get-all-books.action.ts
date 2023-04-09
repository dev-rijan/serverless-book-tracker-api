import "source-map-support/register";

import ResponseModel from "../../models/response.model";
import DatabaseService, { QueryItem } from "../../services/database.service";
import { databaseTables } from "../../utils/util";
import { wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const getAllBookHandler = async (_body: never): Promise<ResponseModel> => {
  const databaseService = new DatabaseService();
  const { bookTable } = databaseTables();

  try {
    const bookParams: QueryItem = {
      TableName: bookTable,
    };

    const data = await databaseService.scan(bookParams);

    return new ResponseModel(
      {
        books: data.Items,
      },
      StatusCode.OK,
      ResponseMessage.GET_BOOK_SUCCESS
    );
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel({}, StatusCode.ERROR, ResponseMessage.GET_BOOK_FAIL);
  }
};

export const getAllBooks = wrapAsRequest(getAllBookHandler);
