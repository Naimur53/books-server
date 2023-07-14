import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'email' | 'password'> | null> {
  return await User.findOne(
    { email },
    { email: 1, password: 1, role: 1, _id: 1 }
  );
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// User.create() / user.save()
userSchema.pre('save', async function (next) {
  // hashing user password

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
