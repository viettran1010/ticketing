import express, {Request, Response} from 'express'
import {body} from 'express-validator'
import {User} from '../models/user'
import {BadRequestError} from '@viettickets/common'
import jwt from 'jsonwebtoken'
import {validateRequest} from '@viettickets/common'

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength( {min: 4, max: 20}).withMessage('Password must be 4-20 characters')
] , 
    validateRequest, 
    async (req: Request,res: Response)=> {
   
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
    }, process.env.JWT_KEY!) // exclamation point here to tell TS this is already checked

    req.session = {
        jwt: userJwt
    }

    res.status(201).send(user);
})

export {router as signupRouter}
