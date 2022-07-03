import { CustomError, ErrorFields } from './custom-error';
export class NotFoundError extends CustomError{
    statusCode = 404;
    constructor(public message:string) {
        super(message||"Route or resource not found");

        Object.setPrototypeOf(this,NotFoundError.prototype)
    }

    serializeErrors(): ErrorFields[] {
        return [{message:this.message||"Route or resource not found", field:""}]
    }
}