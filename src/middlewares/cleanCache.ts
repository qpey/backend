import { clearHash } from '../services/cache';
import { Request, Response, NextFunction } from 'express';

const cleanCache = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	next();

	clearHash(req.currentUser?.id);
};

export { cleanCache };
