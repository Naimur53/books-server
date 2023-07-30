import { IBook } from '../book/book.interface';
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
export type IReading = {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
  status: 'plan to read soon' | 'currently reading' | 'finished';
};
export type IReadingModel = Model<IReading, Record<string, unknown>>;
