import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IProduct } from './product.interface';
import { ProductSearchableFields } from './product.constant';

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const ProductData = req.body;

    const result = await ProductService.createProduct(ProductData);
    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product Created successfully!',
      data: result,
    });
  }
);

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [...ProductSearchableFields]);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductService.getAllProduct(filters, paginationOptions);

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
const getRandom = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getRandom();

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    data: result,
  });
});

const updateProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await ProductService.updateProduct(id, updateAbleData);

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product Updated successfully!',
      data: result,
    });
  }
);
const getSingleProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ProductService.getSingleProduct(id);

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieved  successfully!',
      data: result,
    });
  }
);
const deleteProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ProductService.deleteProduct(id);

    sendResponse<IProduct>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  }
);

export const ProductController = {
  getAllProduct,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  getRandom,
};
