import {Response, Request, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import { RequestValidaionError } from '../errors/request-validation-errors'

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new RequestValidaionError(errors.array());

    }
    next();
}
