import "source-map-support/register";

import CommentModel, { ICommentInterface } from "../../models/comment.model";
import ResponseModel from "../../models/response.model";
import DatabaseService, { PutItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";
import { CommentSchema } from "../../schemas/comment.schema";
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
      validateRequest(body, CommentSchema),
      databaseService.getItem({
        key: body.bookId,
        tableName: bookTable,
      }),
    ]);
    const commentModel = new CommentModel(body);
    const data = commentModel.toEntityMapping();

    const params: PutItem = {
      TableName: commentsTable,
      Item: {
        id: data.id,
        bookId: data.bookId,
        comment: data.comment,
        commentAt: data.commentAt,
      },
    };
    await databaseService.create(params);
    return new ResponseModel(
      { commentId: data.id },
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
