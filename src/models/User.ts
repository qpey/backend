import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
interface UserAttrs {
	email: string;
	name: string;
	password: string;
}

export interface UserDoc extends mongoose.Document {
	name: string;
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
	generateAuthToken(user: UserDoc): string;
}

const userSchema = new mongoose.Schema<UserDoc>(
	{
		name: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			length: 50,
		},
		email: {
			type: String,
			required: true,
			length: 255,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret): void {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
			},
		},
	}
);

userSchema.statics.build = (attrs: UserAttrs): UserDoc => {
	return new User(attrs);
};

userSchema.statics.generateAuthToken = function (user: UserDoc): string {
	const userJWT = jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.JWT_KEY!
	) as string;

	return userJWT;
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
