import { JSONSchemaType } from "ajv";
import { ICommentInterface } from "../models/comment.model";

export const CommentSchema: JSONSchemaType<ICommentInterface> = {
  type: "object",
  properties: {
    id: { type: "string", nullable: true },
    bookId: { type: "string" },
    comment: { type: "string" },
    commentAt: { type: "number", nullable: true },
  },
  required: ["bookId", "comment"],
  additionalProperties: false,
};
