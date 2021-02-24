import express from 'express'
import {body, validationResult} from 'express-validator'
import mongoose from 'mongoose'
import {Response, Request} from 'express'
import {RequestValidaionError} from '../errors/request-validation-errors'

const router = express.Router();

router.post('/api/users/signin', 
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
] , 
(req : Request,res: Response)=> {

    console.log('aaaaaaaaaaaaaaaaaaaa')
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidaionError(errors.array());
    }

})

export {router as signinRouter}
