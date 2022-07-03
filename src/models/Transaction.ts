import mongoose from 'mongoose';
import { UserDoc } from './User';
interface TransactionAttrs {
	txnNo: number;
	flutterWaveTxnNo: number;
	user: UserDoc;
}

interface TransactionDoc extends mongoose.Document {
	userId: string;
	txnNo: number;
	flutterWaveTxnNo: number;
}

interface TransactionModel extends mongoose.Model<TransactionDoc> {
	build(attrs: TransactionAttrs): TransactionDoc;
}

const transactionSchema = new mongoose.Schema<TransactionDoc>(
	{
		transactionNumber: {
			type: Number,
			required: true,
			length: 20,
			trim: true,
		},
		flutterWaveTxnNo: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
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
