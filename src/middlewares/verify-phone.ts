import express, { NextFunction, Request, Response } from "express";
import { sendSMS } from "../services/notification";
import { generateSecureRandomNumber } from "../services/random-number-generator";

const router = express.Router();

router.get(
  "/verify-phone",
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

export const verifyPhone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
  let { code } = req.params;
  let { phone } = req.body;

  sendSMS(code, phone);
};

export const sendVerificationCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let verificationCode = await generateSecureRandomNumber();
  verificationCode !== undefined ? res.send(verificationCode) : res.end(0);
};
