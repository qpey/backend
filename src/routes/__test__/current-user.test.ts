import request from 'supertest';
import { app } from '../../app';

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}

it('should respond with details about the current user', async (): Promise<void> => {
	// @ts-ignore
	const cookie = await global.signin();

	const response = await request(app)
		.get('/api/users/currentuser')
		.set('Cookie', cookie)
		.send()
		.expect(200);

	expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('should respond with null if not authenticated', async (): Promise<void> => {
	const response = await request(app)
		.get('/api/users/currentuser')
		.send()
		.expect(200);

	expect(response.body.currentUser).toEqual(null);
});
