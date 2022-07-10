import request from 'supertest';
import { app } from '../../app';

it('should return a 201 on successful signup', async (): Promise<any> => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);
});

it('should return a 400 with an invalid email', async (): Promise<any> => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test',
			password: 'password',
		})
		.expect(400);
});

it('should return a 400 when signing up with an already existing email', async (): Promise<any> => {
	await request(app).post('/api/users/signup').send({
		email: 'test@test.com',
		password: 'password',
	});

	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400);
});

it('should return a 400 with an invalid password', async (): Promise<any> => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'p',
		})
		.expect(400);
});

it('should return a 400 with missing email and password', async (): Promise<any> => {
	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com' })
		.expect(400);

	await request(app)
		.post('/api/users/signup')
		.send({
			password: 'password',
		})
		.expect(400);
});

it('disallows duplicate emails', async (): Promise<any> => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400);
});

it('sets a cookie after successful signup', async (): Promise<any> => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});
