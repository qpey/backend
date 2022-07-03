export abstract class CustomError extends Error {
    abstract statusCode:number;

    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this,CustomError.prototype);
    }

    abstract serializeErrors(): ErrorFields[]
}

export interface ErrorFields{
    message:string;
    field?:string
}