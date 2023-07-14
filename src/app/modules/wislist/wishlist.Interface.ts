import { IBook } from '../book/book.interface';
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
export type IWishlist = {
  user: Types.ObjectId | IUser;
  book: Types.ObjectId | IBook;
};
export type IWishlistModel = Model<IWishlist, Record<string, unknown>>;
