import { CustomError, ErrorFields } from './custom-error';
import {ValidationError} from "express-validator";

// TODO: implememt this ValidationError type specific to (joi)
export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('Invalid Request Parameters');

        Object.setPrototypeOf(this,RequestValidationError.prototype);
    }

    serializeErrors(): ErrorFields[] {
        return this.errors.map(error => {
            return {message:error.msg, field:error.param}
        })
    }
}