import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieSession from "cookie-session";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { NotFoundError } from "./errors";
import { CustomError } from "./errors";

import { currentUserRouter } from "./routes/auth/current-user";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";
import { signupRouter } from "./routes/auth/signup";
import { homeRouter } from "./routes/home";
import { smsRouter } from "./routes/sms";

const app: Express = express();

const apiPrefixEndPoint = "/api/v1";

app.set("trust proxy", true);
app.disable("X-Powered-By");
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cookieSession({
    secure: process.env.NODE_ENV === "production",
    secret: process.env.COOKIE_SERCRET!,
    keys: [process.env.COOKIE_KEY!],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${apiPrefixEndPoint}/auth`, signinRouter);
app.use(`${apiPrefixEndPoint}/auth`, signoutRouter);
app.use(`${apiPrefixEndPoint}/auth`, signupRouter);
app.use(`${apiPrefixEndPoint}/auth`, currentUserRouter);
app.use(`${apiPrefixEndPoint}`, smsRouter);
app.use(`${apiPrefixEndPoint}`, homeRouter);

app.all("*", async (req: Request, res: Response) => {
  const error = new NotFoundError("Route to resource not Found");
  return res.status(error.statusCode).send(error.serializeErrors());
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  return res.status(500).send({
    errors: [
      {
        message:
          "Something went terribly wrong. Our Engineers are working hard to fix it",
      },
    ],
  });
});

export { app };
