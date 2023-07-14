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
    { path: 'book' },
  ]);

  return getAllWishlist;
};
export const WishlistService = {
  createWishlist,
  getAllWishlist,
  getSingleUserWishlist,
};
