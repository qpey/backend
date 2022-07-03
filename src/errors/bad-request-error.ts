import { CustomError, ErrorFields } from './custom-error';
export class BadRequestError extends CustomError{
    statusCode = 400;
    constructor(public message:string) {
        super(message);

        Object.setPrototypeOf(this,BadRequestError.prototype)
    }

    serializeErrors(): ErrorFields[] {
        return [{message:this.message, field:""}]
    }
}