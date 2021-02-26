import express from 'express'
import {body} from 'express-validator'
import {Response, Request} from 'express'
import {validateRequest} from '@viettickets/common'
import {User} from '../models/user'
import {BadRequestError} from '@viettickets/common'
import {Password} from '../services/password'
import jwt from 'jsonwebtoken'

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
 async (req : Request,res: Response)=> {
    const {email, password} = req.body
    const existingUser = await User.findOne({email}).exec();

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials')
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
        throw new BadRequestError('Invalid credentials')
    }

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!) // exclamation point here to tell TS this is already checked

    req.session = {
        jwt: userJwt
    }

    res.status(201).send(existingUser);
})

export {router as signinRouter}
