import { Types } from 'mongoose';

export interface Token extends Object {
  id: Types.ObjectId;
  expiresIn: number;
}
