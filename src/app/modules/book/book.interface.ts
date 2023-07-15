import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
export type BookGenre =
  | 'Action and Adventure'
  | 'Art'
  | 'Biography'
  | 'Children'
  | 'Comics and Graphic Novels'
  | 'Cookbooks'
  | 'Drama'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Humor and Comedy'
  | 'Mystery'
  | 'Non-Fiction'
  | 'Poetry'
  | 'Religion and Spirituality'
  | 'Romance'
  | 'Science Fiction'
  | 'Self-Help'
  | 'Sports'
  | 'Thriller'
  | 'Travel';

export type IBook = {
  title: string;
  author: string;
  genre: BookGenre;
  publishedDate: Date;
  creator: Types.ObjectId | IUser;
};
export type BookModel = Model<IBook, Record<string, unknown>>;
export type IBookFilters = {
  searchTerm?: string;
  maxPrice?: string;
  minPrice?: string;
  publishedDate?: string;
};

export type IBookFilterByPrice = {
  $gte?: number;
  $lte?: number;
};
