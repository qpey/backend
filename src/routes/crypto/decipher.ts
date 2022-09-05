import express, { Response, Request } from "express";
import { decryptCipherText } from "../../core/decipher";
import { BadRequestError } from "../../errors";
import { AuthenticatedMiddleware } from "../../middlewares/auth";
import { User } from "../../models/User";

const router = express.Router();

router.post(
  "/decrypt",
  AuthenticatedMiddleware,
  async (req: Request, res: Response) => {
    const { data } = req.body;

    if (!data) {
      return res
        .send(
          new BadRequestError(
            "Must provide valid plain text data to be encrypted"
          )
        )
        .status(400);
    }
    const currentUser = await User.findOne({ phone: req.currentUser?.phone });
    console.log(currentUser);
    const plainText = decryptCipherText(data, currentUser?.key!);
    res.send(plainText);
  }
);

export { router as decryptionRouter };
