import express, { Response, Request } from 'express';
import { BadRequestError } from '../../errors';
import { InternalServerError } from '../../errors';
import { currentUser } from '../../middlewares/current-user';

const router = express.Router();

router.post('/users/signout', (req: Request, res: Response) => {
	(req.session as any) = null;
	return res.send({ message: 'user session destroyed' });
});

export { router as signoutRouter };
