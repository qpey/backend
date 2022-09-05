import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares";
import { BadRequestError } from "../../errors";
import { User } from "../../models/User";
import { PasswordManager } from "../../services/password";

const router = express.Router();

router.post(
  "/",
  [
    body("phone").isMobilePhone("en-UG").withMessage("Phone must be valid"),
    body("password").notEmpty().withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response): Promise<any> => {
    const { phone, password } = req.body;

    const existingUser = await User.findOne({ phone });

    if (!existingUser) {
      const error = new BadRequestError("Invalid credentials");
      return res.status(error.statusCode).send(error.serializeErrors());
    }

    const passwordsDoMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );

    if (!passwordsDoMatch) {
      const error = new BadRequestError("Invalid credentials");
      return res.status(error.statusCode).send(error.serializeErrors());
    }

    const userJWT = User.generateAuthToken(existingUser);
    req.session.jwt = userJWT;

    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
