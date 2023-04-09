import { v4 as UUID } from "uuid";

interface IProps {
  id?: string;
  bookId: string;
  comment: string;
  commentAt?: number;
}

export type ICommentInterface = IProps;

export default class CommentModel {
  private readonly _id: string;
  private _bookId: string;
  private _comment: string;
  private _commentAt: number;

  constructor(state: IProps) {
    this._id = state.id || UUID();
    this._bookId = state.bookId;
    this._comment = state.comment;
    this._commentAt = state.commentAt || new Date().getTime();
  }

  get id(): string {
    return this._id;
  }

  set bookId(value: string) {
    this._bookId = value;
  }

  get bookId(): string {
    return this._bookId;
  }

  set comment(value: string) {
    this._comment = value;
  }

  get comment(): string {
    return this._comment;
  }

  set commentAt(value: number) {
    this._commentAt = value;
  }

  get commentAt(): number {
    return this._commentAt;
  }

  toEntityMapping(): ICommentInterface {
    return {
      id: this.id,
      bookId: this.bookId,
      comment: this.comment,
      commentAt: this.commentAt,
    };
  }
}
