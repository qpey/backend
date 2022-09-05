import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { QPEY_KEYS } from "../config/keys";

interface UserAttrs {
  name: string;
  phone: number;
  password: string;
  key: string;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  phone: number;
  password: string;
  key: string;
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
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    key: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret): void {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.key;
        delete ret.__v;
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
      phone: user.phone,
    },
    QPEY_KEYS.JWT_KEY as jwt.Secret
  ) as string;

  return userJWT;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
