import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../services/token";
import { BadRequestError } from "../errors";

export interface UserPayload {
  id: string;
  phone: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
declare module "express-session" {
  interface SessionData {
    jwt?: string;
  }
}

export async function AuthenticatedMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new BadRequestError("Unauthorised"));
  }

  const accessToken: string = bearer.split("Bearer ")[1].trim();
  try {
    const payload: UserPayload | jwt.JsonWebTokenError = (await verifyToken(
      accessToken
    )) as unknown as UserPayload;

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new BadRequestError("Unauthorised"));
    }

    if (!payload) {
      return next(
        new BadRequestError("Unauthorised. Missing or invalid AuthToken")
      );
    }

    req.currentUser = payload;

    return next();
  } catch (error) {
    return next(new BadRequestError("Unauthorised"));
  }
}
