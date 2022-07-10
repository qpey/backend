import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		next(err.serializeErrors());
	}

	return res.status(500).send({
		errors: [
			{
				message:
					'Something went terribly wrong. Our Engineers are working hard to fix it',
			},
		],
	});
};
