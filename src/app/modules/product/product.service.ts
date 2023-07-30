import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IProduct, IProductFilters } from './product.interface';
import { Product } from './product.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ProductSearchableFields } from './product.constant';
import moment from 'moment-timezone';

const getAllProduct = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
  // all Product
  const { searchTerm, publishedYear, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  //   search text
  if (searchTerm) {
    const wihtoutPublished = ProductSearchableFields.slice(
      0,
      ProductSearchableFields.length - 1
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
  if (publishedYear) {
    // Create a range for the desired year

    moment.tz.setDefault('Asia/Dhaka');

    const startDate = new Date(Number(publishedYear), 0, 1); // January 1st of the desired year
    const endDate = new Date(Number(publishedYear) + 1, 0, 1);
    const startDateTimeZone = moment(startDate);
    const endDateTimeZone = moment(endDate);
    whereConditions['publishedDate'] = {
      $gt: startDateTimeZone,
      $lt: endDateTimeZone,
    };
    console.log(whereConditions);
  }

  const result = await Product.find(whereConditions)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const createProduct = async (payload: IProduct): Promise<IProduct | null> => {
  const newProduct = await Product.create(payload);
  return newProduct;
};

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const getRandom = async (): Promise<IProduct[] | null> => {
  const result = await Product.aggregate([{ $sample: { size: 6 } }]);
  return result;
};
const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id);
  return result;
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!');
  }
  return result;
};

export const ProductService = {
  getAllProduct,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  getRandom,
};
