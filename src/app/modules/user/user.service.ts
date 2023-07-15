import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginResponse } from '../auth/auth.Interface';
import { Secret } from 'jsonwebtoken';

const getAllUser = async (): Promise<IUser[] | null> => {
  // all users
  const allUsers = await User.find({});

  return allUsers;
};
const getUserById = async (id: string): Promise<ILoginResponse | null> => {
  //  users
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  // eslint-disable-next-line no-unused-vars
  const { password, createAt, updatedAt, _id, email, name } = user;

  //create access token & refresh token
  const accessToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    user: { email, _id, name },
    accessToken,
    refreshToken,
  };
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
