import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/",
  async (_req: Request, res: Response): Promise<any> =>
    res.status(200).send("Welcome To Qpey!")
);

export { router as homeRouter };
