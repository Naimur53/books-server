export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILogin = {
  email: string;
  password: string;
};
export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
