import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import {RequestValidaionError} from '../errors/request-validation-errors'
import {User} from '../models/user'
import {BadRequestError} from '../errors/bad-request-error'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength( {min: 4, max: 20}).withMessage('Password must be 4-20 characters')
] , async (req: Request,res: Response)=> {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidaionError(errors.array());
    }
    
    const {email, password} = req.body;

    const existingUser = await User.findOne({email}).exec();

    if (existingUser) {
        throw new BadRequestError('Email in use')
    }

    const user = User.build({email, password});

    await user.save();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 'asdf')

    req.session = {
        jwt: userJwt
    }

    res.status(201).send(user);
})

export {router as signupRouter}
