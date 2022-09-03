import express, { Request, Response } from "express";
import { QPEY_KEYS } from "../../config/keys";
import { client } from "../../services/notification";

const router = express.Router();

router.post("/sms", async (req: Request, res: Response) => {
  const { message, toNo } = req.body;

  client.messages
    .create({
      body: message,
      from: QPEY_KEYS.TWILIO_PHONE_NO,
      to: toNo,
    })
    .then((message) => {
      console.log(message.sid);
      res.send(message.sid);
    });
});

export { router as smsRouter };
