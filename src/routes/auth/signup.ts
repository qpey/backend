import express, { Request, Response } from "express";
import { body } from "express-validator";
import { initialiseKeyDerivation } from "../../core/key-generator";
import { BadRequestError } from "../../errors";
import { validateRequest } from "../../middlewares";
import { User } from "../../models/User";
import { sendSMS } from "../../services/notification";
import { PasswordManager } from "../../services/password";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("name")
      .isLength({ min: 3, max: 25 })
      .withMessage("Name must be between 3 and 25 characters"),
    body("phone").isMobilePhone("en-UG"),
    body("password")
      .isLength({ min: 4, max: 26 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response): Promise<any> => {
    const { name, phone, password } = req.body;

    const phoneInUse = await User.findOne({ phone });

    if (phoneInUse) {
      const error = new BadRequestError("Phone already in use");
      return res.status(error.statusCode).send(error.serializeErrors());
    }

    sendSMS("Welcome to QPey", phone);
    const key = await initialiseKeyDerivation(password);

    const hashedPassword = await PasswordManager.toHash(password);
    const user = User.build({
      name,
      phone,
      key,
      password: hashedPassword,
    });

    await user.save();

    const userJWT = User.generateAuthToken(user);
    req.session.jwt = userJWT;

    return res.status(201).send({ user, authToken: userJWT });
  }
);

export { router as signupRouter };
