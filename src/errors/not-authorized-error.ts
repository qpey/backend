import { CustomError, ErrorFields } from './custom-error';

export class NotAuthorizedError extends CustomError{
    statusCode = 403;

    constructor(public message:string) {
        super(message);

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): ErrorFields[] {
        return [{message:this.message, field:""}]
    }
}