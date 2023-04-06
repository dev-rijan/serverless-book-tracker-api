import "source-map-support/register";

import ResponseModel from "../../models/response.model";
import DatabaseService, { DeleteItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";
import requestConstraints from "../../constraints/task/delete.constraint.json";
import { QueryParams, wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const deleteTaskHandler = async (
  _body: never,
  queryParams: QueryParams
): Promise<ResponseModel> => {
  const databaseService = new DatabaseService();
  const { tasksTable } = databaseTables();

  try {
    await validateRequest(queryParams, requestConstraints);
    const { taskId, bookId } = queryParams;
    const existsItem = await databaseService.existsItem({
      key: taskId!,
      hash: "bookId",
      hashValue: bookId!,
      tableName: tasksTable,
    });
    if (!existsItem) {
      return new ResponseModel(
        {},
        StatusCode.NO_CONTENT,
        ResponseMessage.DELETE_TASK_NOTFOUND
      );
    }
    const params: DeleteItem = {
      TableName: tasksTable,
      Key: {
        id: taskId,
        bookId: bookId,
      },
    };
    await databaseService.delete(params);
    return new ResponseModel(
      {},
      StatusCode.NO_CONTENT,
      ResponseMessage.DELETE_TASK_SUCCESS
    );
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel(
          {},
          StatusCode.ERROR,
          ResponseMessage.DELETE_TASK_FAIL
        );
  }
};

export const deleteTask = wrapAsRequest(deleteTaskHandler);
