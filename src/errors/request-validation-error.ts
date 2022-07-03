import { CustomError, ErrorFields } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    // TODO: implememt this ValidationError type specific to (joi)
    constructor(private errors: ValidationError[]) {
        super('Invalid Request Parameters');

        Object.setPrototypeOf(this,RequestValidationError.prototype);
    }

    serializeErrors(): ErrorFields[] {
        return this.errors.map(error => {
            return {message:error.message, field:error.param}
        })
    }
}