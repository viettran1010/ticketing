import express from 'express'
import {body} from 'express-validator'
import mongoose from 'mongoose'
import {Response, Request} from 'express'
import {validateRequest} from '../middlewares/validate-request'

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
validateRequest,
(req : Request,res: Response)=> {

})

export {router as signinRouter}
