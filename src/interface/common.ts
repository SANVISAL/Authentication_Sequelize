import { Token, User } from "../../models";

export interface IUser extends User {
  userName: string;
  gender: string;
  email: string;
  password: string;
}

export interface IToken {
  userId: number;
  refreshToken: string;
  expiresAt: Date;
}

export interface IUpdateRrfreshToken {
  userId: number;
  refreshToken: string;
  expiresAt: Date;
}

export interface ResponseToken {
  accessToken: string;
  refreshToken: string;
}
