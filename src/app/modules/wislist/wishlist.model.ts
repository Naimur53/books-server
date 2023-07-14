import { Schema, model } from 'mongoose';
import { IWishlist, IWishlistModel } from './wishlist.Interface';

const wishlistSchema = new Schema<IWishlist>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  book: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
});

export const Wishlist = model<IWishlist, IWishlistModel>(
  'wishlist',
  wishlistSchema
);
