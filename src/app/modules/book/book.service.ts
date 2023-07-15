import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { bookSearchableFields } from './book.constant';

const getAllBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  // all Book
  const { searchTerm, publishedDate, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  //   search text
  if (searchTerm) {
    const wihtoutPublished = bookSearchableFields.slice(
      0,
      bookSearchableFields.length - 1
    );

    andConditions.push({
      $or: wihtoutPublished.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // make and query
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions: any =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // Date query
  if (publishedDate) {
    whereConditions['publishedDate'] = publishedDate;
  }

  const result = await Book.find(whereConditions)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .populate('creator');

  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(payload);
  return newBook;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  if (payload.creator) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'sorry you cannot change creator'
    );
  }
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('creator');
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found!');
  }
  return result;
};

export const BookService = {
  getAllBook,
  createBook,
  updateBook,
  getSingleBook,
  deleteBook,
};
