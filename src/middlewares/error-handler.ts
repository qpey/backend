import { Request,Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
):Response<any,Record<string,any>> => {
    if(err instanceof CustomError) {
        return res.status(err.statusCode).send({errors:err.serializeErrors()})
    }

    console.error(err);

    return res.status(500).send({
        errors:[{message:"Something went terribly wrong. Our Engineers are working hard to fix it"}]
    })
}