import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';
import { IReview } from './review.interface';

const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const reviewInfo = req.body;
    const result = await ReviewService.createReview(reviewInfo);
    sendResponse<IReview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Created successfully!',
      data: result,
    });
  }
);
const getAllReviews: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewService.getAllReview();
    sendResponse<IReview[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrieved successfully!',
      data: result,
    });
  }
);
const getSingleBookReviews: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const result = await ReviewService.getSingleBookReviews(bookId);
    sendResponse<IReview[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully!',
      data: result,
    });
  }
);

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleBookReviews,
};
