import "source-map-support/register";

import ResponseModel from "../../models/response.model";
import DatabaseService, { QueryItem } from "../../services/database.service";
import { databaseTables, validateRequest } from "../../utils/util";
import { BookQuerySchema } from "../../schemas/book.schema";
import { QueryParams, wrapAsRequest } from "../../utils/lambda-handler";
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";

const getBookHandler = async (
  _body: never,
  queryParams: QueryParams
): Promise<ResponseModel> => {
  const databaseService = new DatabaseService();
  const { bookTable, commentsTable } = databaseTables();

  try {
    await validateRequest(queryParams, BookQuerySchema);
    const { bookId } = queryParams;
    const data = await databaseService.getItem({
      key: bookId!,
      tableName: bookTable,
    });

    const params: QueryItem = {
      TableName: commentsTable,
      IndexName: "book_index",
      KeyConditionExpression: "bookId = :bookIdVal",
      ExpressionAttributeValues: {
        ":bookIdVal": bookId,
      },
    };

    const results = await databaseService.query(params);
    const comments = results?.Items?.map((comment) => {
      return {
        id: comment.id,
        comment: comment.comment,
        commentAt: comment.commentAt,
      };
    });

    return new ResponseModel(
      {
        book: {
          ...data.Item,
          commentCount: comments?.length,
          comments: comments,
        },
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

export const getBook = wrapAsRequest(getBookHandler);
