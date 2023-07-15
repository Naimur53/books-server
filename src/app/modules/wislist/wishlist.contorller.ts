import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IWishlist } from './wishlist.Interface';
import { WishlistService } from './wishlist.service';

const createWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await WishlistService.createWishlist(data);

    sendResponse<IWishlist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
const getAllWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await WishlistService.getAllWishlist();

    sendResponse<IWishlist[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
const getSingleUserWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await WishlistService.getSingleUserWishlist(userId);

    sendResponse<IWishlist[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
const deleteSingleWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await WishlistService.deleteSingleWishlist(id);

    sendResponse<IWishlist>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book deleted successfully!',
      data: result,
    });
  }
);

export const WishlistController = {
  createWishlist,
  getAllWishlist,
  getSingleUserWishlist,
  deleteSingleWishlist,
};
