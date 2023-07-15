/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  _id?: string;
  email: string;
  password: string;
  name: string;
  createAt: Date;
  updatedAt: Date;
};
export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'name'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
// export type UserModel = Model<IUser, Record<string, unknown>>;
