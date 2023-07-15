import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IReading } from './reading.interface';
import { Reading } from './reading.model';

const createReading = async (payload: IReading): Promise<IReading | null> => {
  const result = await Reading.create(payload);
  return result;
};

const getAllReading = async (): Promise<IReading[] | null> => {
  const allReading = await Reading.find({}).populate([
    { path: 'user' },
    { path: 'book', populate: { path: 'creator' } },
  ]);
  return allReading;
};

const getSingleUserReading = async (
  userId: string
): Promise<IReading[] | null> => {
  const getAllReading = await Reading.find({ user: userId }).populate([
    { path: 'book', populate: { path: 'creator' } },
    { path: 'user' },
  ]);

  return getAllReading;
};
const deleteSingleReading = async (id: string): Promise<IReading | null> => {
  const result = await Reading.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wish not found!');
  }
  return result;
};

const updateReading = async (
  id: string,
  payload: Partial<IReading>
): Promise<IReading | null> => {
  const result = await Reading.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const ReadingService = {
  createReading,
  getAllReading,
  getSingleUserReading,
  deleteSingleReading,
  updateReading,
};
