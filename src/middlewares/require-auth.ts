import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
    req:Request,
    res:Response,
    next:NextFunction
): void => {
    if(!req.currentUser) {
        throw new NotAuthorizedError("Not authorized to perform the desired operation")
    }

    next();
}