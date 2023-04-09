import "source-map-support/register";

import ResponseModel from "../../models/response.model";
import DatabaseService, {
  DeleteItem,
  QueryItem,
} from "../../services/database.service";
import {
  createChunks,
  databaseTables,
  validateRequest,
} from "../../utils/util";
import requestConstraints from "../../constraints/book/get.constraint.json";
import { QueryParams, wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const deleteBookHandler = async (
  _body: never,
  queryParams: QueryParams
): Promise<ResponseModel> => {
  const { bookTable, tasksTable } = databaseTables();
  const databaseService = new DatabaseService();

  try {
    await validateRequest(queryParams, requestConstraints);
    const { bookId } = queryParams;

    // check item exists
    const existsItem = await databaseService.existsItem({
      key: bookId!,
      tableName: bookTable,
    });

    if (!existsItem) {
      return new ResponseModel(
        {},
        StatusCode.NO_CONTENT,
        ResponseMessage.DELETE_BOOK_NOTFOUND
      );
    }

    const params: DeleteItem = {
      TableName: bookTable,
      Key: { id: bookId },
    };

    await databaseService.delete(params); // Delete to-do book

    const taskParams: QueryItem = {
      TableName: tasksTable,
      IndexName: "book_index",
      KeyConditionExpression: "bookId = :bookIdVal",
      ExpressionAttributeValues: {
        ":bookIdVal": bookId,
      },
    };

    const results = await databaseService.query(taskParams);

    if (results?.Items && results?.Items.length) {
      const taskEntities = results?.Items?.map((item) => {
        return { DeleteRequest: { Key: { id: item.id } } };
      });

      if (taskEntities.length > 25) {
        const taskChunks = createChunks(taskEntities, 25);
        await Promise.all(
          taskChunks.map((tasks) => {
            return databaseService.batchCreate({
              RequestItems: {
                [tasksTable]: tasks,
              },
            });
          })
        );
      } else {
        await databaseService.batchCreate({
          RequestItems: {
            [tasksTable]: taskEntities,
          },
        });
      }
    }
    return new ResponseModel(
      {},
      StatusCode.NO_CONTENT,
      ResponseMessage.DELETE_BOOK_SUCCESS
    );
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel(
          {},
          StatusCode.ERROR,
          ResponseMessage.DELETE_BOOK_FAIL
        );
  }
};

export const deleteBook = wrapAsRequest(deleteBookHandler);
