import { v4 as UUID } from "uuid";

interface IProps {
  id?: string;
  bookId: string;
  description: string;
  completed: boolean;
}

export interface ITaskInterface extends IProps {
  timestamp: number;
}

export default class TaskModel {
  private readonly _id: string;
  private _bookId: string;
  private _description: string;
  private _completed: boolean;

  constructor({
    id = UUID(),
    bookId,
    description = "",
    completed = false,
  }: IProps) {
    this._id = id;
    this._bookId = bookId;
    this._description = description;
    this._completed = completed;
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

  set description(value: string) {
    this._description = value;
  }

  get description(): string {
    return this._description;
  }

  set completed(value: boolean) {
    this._completed = value;
  }

  get completed(): boolean {
    return this._completed;
  }

  toEntityMapping(): ITaskInterface {
    return {
      id: this.id,
      bookId: this.bookId,
      description: this.description,
      completed: this.completed,
      timestamp: new Date().getTime(),
    };
  }
}
