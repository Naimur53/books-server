import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReadingService } from './reading.service';
import { IReading } from './reading.interface';

const createReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ReadingService.createReading(data);

    sendResponse<IReading>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
const getAllReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReadingService.getAllReading();

    sendResponse<IReading[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
const getSingleUserReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await ReadingService.getSingleUserReading(userId);

    sendResponse<IReading[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
const deleteSingleReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ReadingService.deleteSingleReading(id);

    sendResponse<IReading>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully!',
      data: result,
    });
  }
);

const updateReading: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await ReadingService.updateReading(id, updateAbleData);

    sendResponse<IReading>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Read Updated successfully!',
      data: result,
    });
  }
);

export const ReadingController = {
  createReading,
  getAllReading,
  getSingleUserReading,
  updateReading,
  deleteSingleReading,
};
