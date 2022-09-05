import express, { Response, Request } from "express";
import { encryptPlainText } from "../../core/cipher";
import { BadRequestError } from "../../errors";
import { requireAuth } from "../../middlewares";
import { AuthenticatedMiddleware } from "../../middlewares/auth";
import { User } from "../../models/User";

const router = express.Router();

router.post(
  "/encrypt",
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

    const user = await User.findOne({ email: req.currentUser?.phone });
    console.log(req.currentUser);
    const cipherText = encryptPlainText(data, user?.key!);
    console.log(cipherText);
    res.send(cipherText);
  }
);

export { router as encryptionRouter };
