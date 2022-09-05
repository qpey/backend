import express, { Response, Request } from "express";
import { decryptCipherText } from "../../core/decipher";
import { BadRequestError } from "../../errors";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
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
  const plainText = decryptCipherText(data, "123456");
  res.send(plainText);
});

export { router as decryptionRouter };
