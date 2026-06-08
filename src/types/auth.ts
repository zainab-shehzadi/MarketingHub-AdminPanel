export type SigninPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id?: string;
  _id?: string;
  name?: string;
  email: string;
  role?: string;
};

export type SigninResponse = {
  success: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
  user?: AuthUser;
  data?: {
    token?: string;
    accessToken?: string;
    user?: AuthUser;
  };
};