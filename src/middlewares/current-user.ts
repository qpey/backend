import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}
declare module 'express-session' {
	interface SessionData {
		jwt?: string;
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (!req.session?.jwt) {
		return next();
	}

	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPayload;
		req.currentUser = payload;
	} catch (error) {
		console.error(error);
	}

	next();
};
