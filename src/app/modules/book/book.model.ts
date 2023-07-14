import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';
export const genreEnumElement = [
  'Action and Adventure',
  'Art',
  'Biography',
  'Children',
  'Comics and Graphic Novels',
  'Cookbooks',
  'Drama',
  'Fantasy',
  'History',
  'Horror',
  'Humor and Comedy',
  'Mystery',
  'Non-Fiction',
  'Poetry',
  'Religion and Spirituality',
  'Romance',
  'Science Fiction',
  'Self-Help',
  'Sports',
  'Thriller',
  'Travel',
];
const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    enum: genreEnumElement,
    required: true,
  },
  creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

export const Book = model<IBook, BookModel>('Book', bookSchema);
