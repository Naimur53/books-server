import { IUser } from '../user/user.interface';

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILogin = {
  email: string;
  password: string;
};
export type ILoginResponse = {
  accessToken: string;
  user: Pick<IUser, '_id' | 'email' | 'name'>;
  refreshToken?: string;
};
