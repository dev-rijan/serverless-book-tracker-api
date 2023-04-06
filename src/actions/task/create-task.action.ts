import "source-map-support/register";

import TaskModel, { ITaskInterface } from "../../models/task.model";
import ResponseModel from "../../models/response.model";
import DatabaseService, { PutItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";
import requestConstraints from "../../constraints/task/create.constraint.json";
import { wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const createTaskHandler = async (
  body: ITaskInterface
): Promise<ResponseModel> => {
  const databaseService = new DatabaseService();
  const { bookTable, tasksTable } = databaseTables();

  try {
    await Promise.all([
      validateRequest(body, requestConstraints),
      databaseService.getItem({
        key: body.bookId,
        tableName: bookTable,
      }),
    ]);
    const taskModel = new TaskModel(body);
    const data = taskModel.toEntityMapping();

    const params: PutItem = {
      TableName: tasksTable,
      Item: {
        id: data.id,
        bookId: data.bookId,
        description: data.description,
        completed: data.completed,
        createdAt: data.timestamp,
        updatedAt: data.timestamp,
      },
    };
    await databaseService.create(params);
    return new ResponseModel(
      { taskId: data.id },
      StatusCode.CREATED,
      ResponseMessage.CREATE_TASK_SUCCESS
    );
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel(
          {},
          StatusCode.ERROR,
          ResponseMessage.CREATE_TASK_FAIL
        );
  }
};

export const createTask = wrapAsRequest(createTaskHandler);
