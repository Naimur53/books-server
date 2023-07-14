import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import bcrypt from 'bcrypt';
import config from '../../../config';

const getAllUser = async (): Promise<IUser[] | null> => {
  // all users
  const allUsers = await User.find({});

  return allUsers;
};
const getUserById = async (id: string): Promise<IUser | null> => {
  //  users
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }
  return user;
};
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // eslint-disable-next-line no-unused-vars
  const { name, password, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  // if password exits
  if (password) {
    updatedUserData.password = await bcrypt.hash(
      password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  const result = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  //  users
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  return user;
};

export const UserService = {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
