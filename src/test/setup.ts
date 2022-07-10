import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}

beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';

	await mongoose.connect(process.env.MONGO_TEST_URI!);
});

beforeEach(async () => {
	jest.clearAllMocks();

	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.close();
});

//@ts-ignore
global.signin = () => {
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'test@test.com',
	};

	const token = jwt.sign(payload, process.env.JWT_KEY!);

	const session = { jwt: token };

	const sessionJSON = JSON.stringify(session);

	const base64 = Buffer.from(sessionJSON).toString('base64');

	return [`express:sess=${base64}`];
};
