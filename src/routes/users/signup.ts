import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors';
import { validateRequest } from '../../middlewares';
import { User } from '../../models/User';
import { PasswordManager } from '../../services/password';

const router = express.Router();

router.post(
	'/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('name')
			.isLength({ min: 3, max: 25 })
			.withMessage('Name must be between 3 and 25 characters'),
		body('password')
			.isLength({ min: 4, max: 26 })
			.withMessage('Password must be between 4 and 20 characters'),
	],
	validateRequest,
	async (req: Request, res: Response): Promise<any> => {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			const error = new BadRequestError('Email already in use');
			return res.status(error.statusCode).send(error.serializeErrors());
		}

		const hashedPassword = await PasswordManager.toHash(password);
		const user = User.build({
			name,
			email,
			password: hashedPassword,
		});

		await user.save();

		const userJWT = User.generateAuthToken(user);
		req.session.jwt = userJWT;

		return res.status(201).send(user);
	}
);

export { router as signupRouter };
