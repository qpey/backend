import express, { Request, Response } from "express";
import { sendSMS } from "../../services/notification";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { message, toNo } = req.body;

  const msg = await sendSMS(message, toNo);
  res.send(msg);
});

export { router as smsRouter };
