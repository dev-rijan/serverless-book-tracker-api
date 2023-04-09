import { v4 as UUID } from "uuid";

export interface IProps {
  id?: string;
  title: string;
  author: string;
  readAt?: string;
}

export type IBookInterface = IProps;

export default class BookModel {
  private _id: string;
  private _title: string;
  private _author: string;
  private _readAt?: string;

  constructor(state: IProps) {
    this._id = state.id || UUID();
    this._title = state.title;
    this._author = state.author;
    this._readAt = state.readAt;
  }

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id;
  }

  set title(value: string) {
    this._title = value;
  }

  get title(): string {
    return this._title;
  }

  set author(value: string) {
    this._author = value;
  }

  get author(): string {
    return this._author;
  }

  set readAt(value: string | undefined) {
    this._readAt = value;
  }

  get readAt(): string | undefined {
    return this._readAt;
  }

  toEntityMappings(): IBookInterface {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      readAt: this.readAt,
    };
  }
}
