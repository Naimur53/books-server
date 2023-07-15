import { IReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: IReview): Promise<IReview | null> => {
  const result = await Review.create(payload);
  return result;
};

const getAllReview = async (): Promise<IReview[] | null> => {
  const allORders = await Review.find({}).populate([
    { path: 'user' },
    { path: 'book' },
  ]);
  return allORders;
};

const getSingleBookReviews = async (
  bookId: string
): Promise<IReview[] | null> => {
  const getAllReview = await Review.find({ book: bookId }).populate([
    { path: 'user' },
  ]);

  return getAllReview;
};
export const ReviewService = {
  createReview,
  getAllReview,
  getSingleBookReviews,
};
