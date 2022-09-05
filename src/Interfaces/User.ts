import { NextFunction } from "express";
import { Model, Types } from "mongoose";

export interface IUser {
  name: string;
  password: string;
  avatar: string;
  phones: string;
  role: string;
}

export interface IUserMethods {
  isValidPassword(
    password: string,
    next: NextFunction
  ): Promise<boolean | void>;
}

export type TUserModel = Model<
  IUser,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  IUserMethods
>;
