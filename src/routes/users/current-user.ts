import express, { Request, Response } from 'express';
import { currentUser } from '../../middlewares';

const router = express.Router();

router.get('/api/currentUser', currentUser, (req: Request, res: Response) => {
	return res.send(req.currentUser || null);
});

export { router as currentUserRouter };
