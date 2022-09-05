import express, { Response, Request } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  (req.session as any) = null;
  return res.send({ message: "user session destroyed" });
});

export { router as signoutRouter };
