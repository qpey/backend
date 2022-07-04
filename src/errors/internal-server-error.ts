import { CustomError, ErrorFields } from './custom-error';

export class InternalServerError extends CustomError {
	statusCode = 403;

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, InternalServerError.prototype);
	}

	serializeErrors(): ErrorFields[] {
		return [{ message: this.message, field: '' }];
	}
}
