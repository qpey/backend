import mongoose from 'mongoose';
import { UserDoc } from './User';
interface TransactionAttrs {
	txnNo: number;
	waveTxnNo: number;
	// user: UserDoc;
}

interface TransactionDoc extends mongoose.Document {
	txnNo: number;
	waveTxnNo: number;
	// user: string;
}

interface TransactionModel extends mongoose.Model<TransactionDoc> {
	build(attrs: TransactionAttrs): TransactionDoc;
}

const transactionSchema = new mongoose.Schema<TransactionDoc>(
	{
		txnNo: {
			type: Number,
			required: true,
			length: 20,
			trim: true,
			unique: true,
		},
		waveTxnNo: {
			type: Number,
			required: true,
			trim: true,
			unique: true,
		},
		// @ts-ignore
		// user: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'User',
		// },
	// 	userId: {
	// 		type: String,
	// 		required:true,
	// 	}
	},
	{
		toJSON: {
			transform(doc, ret): void {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

transactionSchema.statics.build = (attrs: TransactionAttrs): TransactionDoc => {
	return new Transaction(attrs);
};

const Transaction = mongoose.model<TransactionDoc, TransactionModel>(
	'Transaction',
	transactionSchema
);

export { Transaction };
