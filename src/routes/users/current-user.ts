import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares';

const router = express.Router();

router.get(
	'/api/users/current-user',
	currentUser,
	(req: Request, res: Response) => {
		console.log('currentuser: ', req.currentUser);
		return res.status(200).send(req.currentUser || null);
	}
);

export { router as currentUserRouter };
