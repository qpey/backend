import { app } from './app';
import mongoose from 'mongoose';

const start = async (): Promise<void> => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined!');
	}
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined!');
	}
	if (!process.env.REDIS_URI) {
		throw new Error('REDIS_URI must be defined!');
	}
	if (!process.env.COOKIE_SECRET) {
		throw new Error('COOKIE_SECRET must be defined');
	}
	if (!process.env.API_KEY) {
		throw new Error('API_KEY must be defined');
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Connected to MongoDB');
	} catch (error) {}
};

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
