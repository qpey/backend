import express, { Response, Request } from 'express';
import { BadRequestError } from '../../errors';
import { InternalServerError } from '../../errors';

const router = express.Router();

router.get('/api/users/signout', (req: Request, res: Response) => {
	req.session.destroy(err => {
		if (err) {
			console.error(err);

			return res.send(
				new InternalServerError(
					"Interanal server failure: Failed to unset the user's sesion"
				).serializeErrors()
			);
		}

		return res.send({ message: 'user session destroyed' });
	});
});

export { router as signoutRouter };
