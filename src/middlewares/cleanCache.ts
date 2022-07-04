import { clearHash } from '../services/cache';
import { Request, Response, NextFunction } from 'express';

module.exports = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	await next();

	clearHash(req.currentUser?.id);
};
