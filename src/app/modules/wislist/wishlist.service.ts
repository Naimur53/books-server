import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IWishlist } from './wishlist.Interface';
import { Wishlist } from './wishlist.model';

const createWishlist = async (
  payload: IWishlist
): Promise<IWishlist | null> => {
  const result = await Wishlist.create(payload);
  return result;
};

const getAllWishlist = async (): Promise<IWishlist[] | null> => {
  const allWishlist = await Wishlist.find({}).populate([
    { path: 'user' },
    { path: 'book' },
  ]);
  return allWishlist;
};

const getSingleUserWishlist = async (
  userId: string
): Promise<IWishlist[] | null> => {
  const getAllWishlist = await Wishlist.find({ user: userId }).populate([
    { path: 'book', populate: { path: 'creator' } },
    { path: 'user' },
  ]);

  return getAllWishlist;
};
const deleteSingleWishlist = async (id: string): Promise<IWishlist | null> => {
  const result = await Wishlist.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wish not found!');
  }
  return result;
};
export const WishlistService = {
  createWishlist,
  getAllWishlist,
  getSingleUserWishlist,
  deleteSingleWishlist,
};
