import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IBook } from './book.interface';
import { bookSearchableFields } from './book.constant';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const BookData = req.body;

    const result = await BookService.createBook(BookData);
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Created successfully!',
      data: result,
    });
  }
);

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [...bookSearchableFields]);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBook(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await BookService.updateBook(id, updateAbleData);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book Updated successfully!',
      data: result,
    });
  }
);
const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BookService.getSingleBook(id);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book retrieved  successfully!',
      data: result,
    });
  }
);
const deleteBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await BookService.deleteBook(id);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully!',
      data: result,
    });
  }
);

export const BookController = {
  getAllBook,
  createBook,
  updateBook,
  getSingleBook,
  deleteBook,
};
