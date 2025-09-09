export type LoginResponse = {
  error: boolean;
  message: string;
  token: string;
  user: IUser;
};

export type IUser = {
  email: string;
  name: string;
  updated_at: string;
  created_at: string;
  id: number;
};
