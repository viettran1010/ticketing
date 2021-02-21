import {Request, Response, NextFunction} from 'express'
import {RequestValidaionError} from '../errors/request-validation-errors'
import {DatabaseConnectionError} from '../errors/database-connection-errors'
import {ValidationError} from 'express-validator'

export const errorHandler = (err: Error,req: Request,res: Response, next: NextFunction)=> {

    if (err instanceof RequestValidaionError) {
        const formattedErrors = err.errors.map((error: ValidationError)=> {
            return {message: error.msg, field: error.param}
        })
        return res.status(400).send({errors: formattedErrors})
    }
    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send({ errors: [{message: err.reason}]})
    }
    res.status(400).send({
        errors: [{ message: 'Something went wrong'}]
    })
}
