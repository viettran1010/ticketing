import {ValidationError} from 'express-validator'

export class RequestValidaionError extends Error {
    constructor(public errors: ValidationError[]) {
        super();

        //Only because we are extending a built-in class
        Object.setPrototypeOf(this, RequestValidaionError.prototype)
    }
}
