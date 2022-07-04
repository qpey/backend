import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares';
import { BadRequestError } from '../../errors';
import { User } from '../../models/User';
import { PasswordManager } from '../../services/password';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').notEmpty().withMessage('You must supply a password'),
	],
	validateRequest,
	async (req: Request, res: Response): Promise<any> => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new BadRequestError('Invalid credentials');
		}

		const passwordsDoMatch = PasswordManager.compare(
			existingUser.password,
			password
		);

		if (!passwordsDoMatch) {
			throw new BadRequestError('Invalid credentials');
		}

		const userJWT = User.generateAuthToken(existingUser);
		req.session.jwt = userJWT;

		return res.status(200).send(existingUser);
	}
);

export { router as signinRouter };
