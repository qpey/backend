import { Token } from "../Interfaces/Token";
import { IUser } from "../Interfaces/User";
import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import { QPEY_KEYS } from "../config/keys";

export const createToken = (user: Document<IUser>): string => {
  return jwt.sign({ id: user._id }, QPEY_KEYS.JWT_KEY as jwt.Secret, {
    expiresIn: "1d",
  });
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, QPEY_KEYS.JWT_KEY as jwt.Secret, (err, payload) => {
      if (err) reject(err);

      resolve(payload as Token);
    });
  });
};

export default { createToken, verifyToken };
