import Ajv, { JSONSchemaType } from "ajv";

import ResponseModel from "../models/response.model";

export const validateRequest = <INPUT>(
  values: INPUT,
  schema: JSONSchemaType<INPUT>
): Promise<INPUT> => {
  return new Promise<INPUT>((resolve, reject) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    if (validate(values)) {
      resolve(values);
    } else {
      reject(
        new ResponseModel(
          { errors: validate.errors },
          400,
          "required fields are missing"
        )
      );
    }
  });
};

export const createChunks = <T>(data: T[], chunkSize: number): T[][] => {
  const urlChunks: T[][] = [];
  let batchIterator = 0;
  while (batchIterator < data.length) {
    urlChunks.push(data.slice(batchIterator, (batchIterator += chunkSize)));
  }
  return urlChunks;
};

export type DatabaseProp = {
  bookTable: string;
  commentsTable: string;
};

export const databaseTables = (): DatabaseProp => {
  const { BOOK_TABLE, COMMENTS_TABLE } = process.env;
  return {
    bookTable: BOOK_TABLE ?? "unknown-book-table",
    commentsTable: COMMENTS_TABLE ?? "unknown-comments-table",
  };
};
