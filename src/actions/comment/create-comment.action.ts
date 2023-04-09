import "source-map-support/register";

import CommentModel, { ICommentInterface } from "../../models/comment.model";
import ResponseModel from "../../models/response.model";
import DatabaseService, { PutItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";
import requestConstraints from "../../constraints/comment/create.constraint.json";
import { wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const createCommentHandler = async (
  body: ICommentInterface
): Promise<ResponseModel> => {
  const databaseService = new DatabaseService();
  const { bookTable, commentsTable } = databaseTables();

  try {
    await Promise.all([
      validateRequest(body, requestConstraints),
      databaseService.getItem({
        key: body.bookId,
        tableName: bookTable,
      }),
    ]);
    const taskModel = new CommentModel(body);
    const data = taskModel.toEntityMapping();

    const params: PutItem = {
      TableName: commentsTable,
      Item: {
        id: data.id,
        bookId: data.bookId,
        comment: data.comment,
        // createdAt: data.timestamp,
        // updatedAt: data.timestamp,
      },
    };
    await databaseService.create(params);
    return new ResponseModel(
      { taskId: data.id },
      StatusCode.CREATED,
      ResponseMessage.CREATE_COMMENT_SUCCESS
    );
  } catch (error) {
    return error instanceof ResponseModel
      ? error
      : new ResponseModel(
          {},
          StatusCode.ERROR,
          ResponseMessage.CREATE_COMMENT_FAIL
        );
  }
};

export const createComment = wrapAsRequest(createCommentHandler);