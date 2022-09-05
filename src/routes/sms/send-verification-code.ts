import express, { NextFunction, Request, Response } from "express";
import { sendVerificationMessage } from "../../services/verify-phone";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const data = sendVerificationMessage();

  res.end(data);
});

export { router as verifyPhoneRouter };
