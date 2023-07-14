import { Schema, model } from 'mongoose';
import { IReview, IReviewModel } from './order.interface';

const reviewSchema = new Schema<IReview>({
  review: {
    type: String,
    required: true,
  },

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

export const Review = model<IReview, IReviewModel>('Review', reviewSchema);
