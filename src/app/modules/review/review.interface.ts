import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../book/book.interface';

export type IReview = {
  review: string;
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
};
export type IReviewModel = Model<IReview, Record<string, unknown>>;
