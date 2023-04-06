import "source-map-support/register";

import ResponseModel from "../../models/response.model";
import DatabaseService, { UpdateItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";
import requestConstraints from "../../constraints/book/update.constraint.json";
import { wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const updateBookHandler = async (body: {
  bookId: string;
  name: string;
}): Promise<ResponseModel> => {
  const databaseService = new DatabaseService();
  const { bookTable } = databaseTables();
  const { bookId, name } = body;

  try {
    await Promise.all([
      validateRequest(body, requestConstraints),
      databaseService.getItem({ key: bookId, tableName: bookTable }),
    ]);

    const params: UpdateItem = {
      TableName: bookTable,
      Key: {
        id: bookId,
      },
      UpdateExpression: "set #name = :name, updatedAt = :timestamp",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":timestamp": new Date().getTime(),
      },
      ReturnValues: "UPDATED_NEW",
    };
    const results = await databaseService.update(params);
    return new ResponseModel(
      { ...results.Attributes },
      StatusCode.OK,
      ResponseMessage.UPDATE_BOOK_SUCCESS
    );
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel(
          {},
          StatusCode.ERROR,
          ResponseMessage.UPDATE_BOOK_FAIL
        );
  }
};

export const updateBook = wrapAsRequest(updateBookHandler);
