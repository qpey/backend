import express, { Response, Request } from 'express';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
	(req.session as any) = null;
	return res.send({ message: 'user session destroyed' });
});

export { router as signoutRouter };
